import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import User from "@/models/User";
import University from "@/models/University";
import { withAdminAuth } from "@/lib/unifiedAuth";
import {
    createSuccessResponse,
    createPaginatedResponse,
    createErrorResponse,
    createValidationErrorResponse,
    createNotFoundResponse,
    createConflictResponse,
    sendResponse,
    extractPaginationParams,
    extractSearchParams
} from "@/lib/responseFormatter";

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const { page, limit, skip } = extractPaginationParams(req.query, { page: 1, limit: 20 });
                const { status, priority, universityId, studentId, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

                // Build query filters
                const filters = { isActive: true };

                if (status) filters.status = status;
                if (priority) filters.priority = priority;
                if (universityId) filters.universityId = universityId;
                if (studentId) filters.studentId = studentId;

                // Search functionality
                let searchFilters = {};
                if (search) {
                    // We'll search in populated fields, so we need to use aggregation
                    const searchRegex = { $regex: search, $options: 'i' };
                    searchFilters = {
                        $or: [
                            { universityName: searchRegex },
                            { notes: searchRegex }
                        ]
                    };
                }

                // Combine filters
                const finalFilters = { ...filters, ...searchFilters };

                // Build sort object
                const sortObj = {};
                sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

                // Get applications with pagination
                const applications = await Application.find(finalFilters)
                    .populate("studentId", "name email phone createdAt")
                    .populate("universityId", "name city type")
                    .populate("lastModifiedBy", "name email")
                    .populate("adminNotes.adminId", "name")
                    .sort(sortObj)
                    .skip(skip)
                    .limit(limit);

                // Get total count
                const total = await Application.countDocuments(finalFilters);

                // Format applications with enhanced data
                const formattedApplications = applications.map(app => ({
                    id: app._id,
                    student: {
                        id: app.studentId?._id,
                        name: app.studentId?.name,
                        email: app.studentId?.email,
                        phone: app.studentId?.phone,
                        registeredAt: app.studentId?.createdAt
                    },
                    university: {
                        id: app.universityId?._id,
                        name: app.universityId?.name || app.universityName,
                        city: app.universityId?.city,
                        type: app.universityId?.type,
                    },
                    status: app.status,
                    priority: app.priority,
                    flags: app.flags,
                    notes: app.notes, // Legacy notes
                    adminNotes: app.adminNotes.map(note => ({
                        id: note._id,
                        note: note.note,
                        type: note.type,
                        timestamp: note.timestamp,
                        isPrivate: note.isPrivate,
                        admin: {
                            id: note.adminId?._id,
                            name: note.adminId?.name
                        }
                    })),
                    statusHistory: app.statusHistory,
                    applicationData: app.applicationData,
                    lastModifiedBy: app.lastModifiedBy ? {
                        id: app.lastModifiedBy._id,
                        name: app.lastModifiedBy.name
                    } : null,
                    lastContactDate: app.lastContactDate,
                    nextFollowUpDate: app.nextFollowUpDate,
                    source: app.source,
                    submittedAt: app.submittedAt,
                    appliedAt: app.createdAt,
                    updatedAt: app.updatedAt,
                }));

                // Get statistics
                const stats = await Application.aggregate([
                    { $match: { isActive: true } },
                    { $group: { _id: "$status", count: { $sum: 1 } } }
                ]);

                const statusStats = stats.reduce((acc, stat) => {
                    acc[stat._id] = stat.count;
                    return acc;
                }, {});

                const response = createPaginatedResponse(
                    formattedApplications,
                    page,
                    limit,
                    total,
                    "Applications retrieved successfully",
                    {
                        statistics: {
                            total,
                            statusBreakdown: statusStats
                        }
                    }
                );

                return sendResponse(res, response);
            } catch (error) {
                console.error("Get applications error:", error);
                return sendResponse(res, createErrorResponse(
                    "Failed to fetch applications",
                    "FETCH_ERROR",
                    500
                ));
            }

        case "POST":
            try {
                const {
                    studentId,
                    universityId,
                    status,
                    notes,
                    priority,
                    flags,
                    applicationData,
                    source,
                    adminNote
                } = req.body;

                // Validate required fields
                if (!studentId || !universityId) {
                    return sendResponse(res, createValidationErrorResponse(
                        { studentId: "Student ID is required", universityId: "University ID is required" },
                        "Student ID and University ID are required"
                    ));
                }

                // Verify student exists and is a student
                const student = await User.findById(studentId);
                if (!student) {
                    return sendResponse(res, createNotFoundResponse("Student", studentId));
                }
                if (student.role !== "student") {
                    return sendResponse(res, createValidationErrorResponse(
                        { studentId: "User must be a student" },
                        "Invalid student ID"
                    ));
                }

                // Verify university exists
                const university = await University.findById(universityId);
                if (!university) {
                    return sendResponse(res, createNotFoundResponse("University", universityId));
                }

                // Check for duplicate application
                const existingApp = await Application.findOne({
                    studentId,
                    universityId,
                    isActive: true
                });

                if (existingApp) {
                    return sendResponse(res, createConflictResponse(
                        "Application already exists for this student and university"
                    ));
                }

                // Create application data
                const applicationPayload = {
                    studentId,
                    universityId,
                    universityName: university.name,
                    status: status || "pending",
                    notes: notes || "",
                    priority: priority || "normal",
                    flags: flags || [],
                    applicationData: applicationData || { documents: [], personalInfo: {}, preferences: {} },
                    source: source || "website",
                    submittedAt: new Date(),
                    lastModifiedBy: req.user.userId
                };

                // Create application
                const application = await Application.create(applicationPayload);

                // Add initial admin note if provided
                if (adminNote) {
                    await application.addAdminNote(
                        req.user.userId,
                        adminNote,
                        'general',
                        false
                    );
                }

                // Populate the created application
                const populatedApplication = await Application.findById(application._id)
                    .populate("studentId", "name email phone")
                    .populate("universityId", "name city type")
                    .populate("lastModifiedBy", "name email");

                const response = createSuccessResponse(
                    populatedApplication,
                    "Application created successfully"
                );

                return sendResponse(res, response, 201);
            } catch (error) {
                console.error("Create application error:", error);
                return sendResponse(res, createErrorResponse(
                    "Failed to create application",
                    "CREATE_ERROR",
                    500
                ));
            }

        default:
            return sendResponse(res, createErrorResponse(
                "Method not allowed",
                "METHOD_NOT_ALLOWED",
                405
            ));
    }
}

export default withAdminAuth(handler);
