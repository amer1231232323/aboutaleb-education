import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import User from "@/models/User";
import University from "@/models/University";
import { withAdminAuth } from "@/lib/unifiedAuth";
import {
    createSuccessResponse,
    createErrorResponse,
    createValidationErrorResponse,
    createNotFoundResponse,
    sendResponse
} from "@/lib/responseFormatter";

async function handler(req, res) {
    await connectDB();

    const { method } = req;
    const { id } = req.query;

    // Validate application ID
    if (!id || id === 'undefined') {
        return sendResponse(res, createValidationErrorResponse(
            { id: "Application ID is required" },
            "Invalid application ID"
        ));
    }

    switch (method) {
        case "GET":
            try {
                const application = await Application.findById(id)
                    .populate("studentId", "name email phone createdAt")
                    .populate("universityId", "name city type website contact")
                    .populate("lastModifiedBy", "name email")
                    .populate("adminNotes.adminId", "name email")
                    .populate("statusHistory.changedBy", "name");

                if (!application) {
                    return sendResponse(res, createNotFoundResponse("Application", id));
                }

                // Format the response with complete application data
                const formattedApplication = {
                    id: application._id,
                    student: {
                        id: application.studentId?._id,
                        name: application.studentId?.name,
                        email: application.studentId?.email,
                        phone: application.studentId?.phone,
                        registeredAt: application.studentId?.createdAt
                    },
                    university: {
                        id: application.universityId?._id,
                        name: application.universityId?.name || application.universityName,
                        city: application.universityId?.city,
                        type: application.universityId?.type,
                        website: application.universityId?.website,
                        contact: application.universityId?.contact
                    },
                    status: application.status,
                    priority: application.priority,
                    flags: application.flags,
                    notes: application.notes, // Legacy notes
                    adminNotes: application.adminNotes.map(note => ({
                        id: note._id,
                        note: note.note,
                        type: note.type,
                        timestamp: note.timestamp,
                        isPrivate: note.isPrivate,
                        admin: {
                            id: note.adminId?._id,
                            name: note.adminId?.name,
                            email: note.adminId?.email
                        }
                    })),
                    statusHistory: application.statusHistory.map(history => ({
                        status: history.status,
                        changedAt: history.changedAt,
                        reason: history.reason,
                        changedBy: {
                            id: history.changedBy?._id,
                            name: history.changedBy?.name
                        }
                    })),
                    applicationData: application.applicationData,
                    lastModifiedBy: application.lastModifiedBy ? {
                        id: application.lastModifiedBy._id,
                        name: application.lastModifiedBy.name,
                        email: application.lastModifiedBy.email
                    } : null,
                    lastContactDate: application.lastContactDate,
                    nextFollowUpDate: application.nextFollowUpDate,
                    source: application.source,
                    submittedAt: application.submittedAt,
                    reviewStartedAt: application.reviewStartedAt,
                    reviewCompletedAt: application.reviewCompletedAt,
                    externalApplicationId: application.externalApplicationId,
                    appliedAt: application.createdAt,
                    updatedAt: application.updatedAt,
                    isActive: application.isActive
                };

                return sendResponse(res, createSuccessResponse(
                    formattedApplication,
                    "Application retrieved successfully"
                ));
            } catch (error) {
                console.error("Get application error:", error);
                return sendResponse(res, createErrorResponse(
                    "Failed to fetch application",
                    "FETCH_ERROR",
                    500
                ));
            }

        case "PUT":
            try {
                const {
                    status,
                    notes,
                    priority,
                    flags,
                    applicationData,
                    lastContactDate,
                    nextFollowUpDate,
                    externalApplicationId,
                    adminNote,
                    adminNoteType,
                    adminNotePrivate,
                    statusChangeReason
                } = req.body;

                // Find the application
                const application = await Application.findById(id);
                if (!application) {
                    return sendResponse(res, createNotFoundResponse("Application", id));
                }

                const oldStatus = application.status;
                let statusChanged = false;

                // Prepare update data
                const updateData = {
                    lastModifiedBy: req.user.userId,
                    updatedAt: new Date()
                };

                // Update fields if provided
                if (notes !== undefined) updateData.notes = notes;
                if (priority !== undefined) updateData.priority = priority;
                if (flags !== undefined) updateData.flags = flags;
                if (applicationData !== undefined) updateData.applicationData = applicationData;
                if (lastContactDate !== undefined) updateData.lastContactDate = lastContactDate;
                if (nextFollowUpDate !== undefined) updateData.nextFollowUpDate = nextFollowUpDate;
                if (externalApplicationId !== undefined) updateData.externalApplicationId = externalApplicationId;

                // Handle status change with history tracking
                if (status !== undefined && status !== oldStatus) {
                    statusChanged = true;
                    await application.updateStatus(status, req.user.userId, statusChangeReason || '');
                } else {
                    // Update other fields
                    Object.assign(application, updateData);
                    await application.save();
                }

                // Add admin note if provided
                if (adminNote && adminNote.trim()) {
                    await application.addAdminNote(
                        req.user.userId,
                        adminNote.trim(),
                        adminNoteType || 'general',
                        adminNotePrivate || false
                    );
                }

                // Populate the updated application
                const updatedApplication = await Application.findById(id)
                    .populate("studentId", "name email phone")
                    .populate("universityId", "name city type")
                    .populate("lastModifiedBy", "name email")
                    .populate("adminNotes.adminId", "name");

                const message = statusChanged
                    ? `Application status updated from "${oldStatus}" to "${status}"`
                    : "Application updated successfully";

                return sendResponse(res, createSuccessResponse(
                    updatedApplication,
                    message
                ));
            } catch (error) {
                console.error("Update application error:", error);
                return sendResponse(res, createErrorResponse(
                    "Failed to update application",
                    "UPDATE_ERROR",
                    500
                ));
            }

        case "DELETE":
            try {
                const application = await Application.findById(id);
                if (!application) {
                    return sendResponse(res, createNotFoundResponse("Application", id));
                }

                // Soft delete by setting isActive to false
                application.isActive = false;
                application.lastModifiedBy = req.user.userId;
                await application.save();

                // Add admin note about deletion
                await application.addAdminNote(
                    req.user.userId,
                    "Application marked as deleted",
                    'general',
                    true // Private note
                );

                return sendResponse(res, createSuccessResponse(
                    {
                        id: application._id,
                        deletedAt: new Date(),
                        deletedBy: req.user.userId
                    },
                    "Application deleted successfully"
                ));
            } catch (error) {
                console.error("Delete application error:", error);
                return sendResponse(res, createErrorResponse(
                    "Failed to delete application",
                    "DELETE_ERROR",
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