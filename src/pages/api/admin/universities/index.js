import { connectDB } from "@/lib/db";
import University from "@/models/University";
import { withAdminAuth } from "@/lib/unifiedAuth";

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const { page = 1, limit = 10, search, type, city } = req.query;

                // Build query filters
                const filters = {};
                if (search) {
                    filters.$or = [
                        { name: { $regex: search, $options: 'i' } },
                        { nameAr: { $regex: search, $options: 'i' } },
                        { city: { $regex: search, $options: 'i' } }
                    ];
                }
                if (type) filters.type = type;
                if (city) filters.city = city;

                // Calculate pagination
                const skip = (parseInt(page) - 1) * parseInt(limit);

                // Get universities with pagination
                const universities = await University.find(filters)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(parseInt(limit));

                // Get total count for pagination
                const total = await University.countDocuments(filters);
                const totalPages = Math.ceil(total / parseInt(limit));

                return res.status(200).json({
                    success: true,
                    data: universities,
                    meta: {
                        timestamp: new Date().toISOString(),
                        pagination: {
                            page: parseInt(page),
                            limit: parseInt(limit),
                            total,
                            totalPages,
                            hasNext: parseInt(page) < totalPages,
                            hasPrev: parseInt(page) > 1
                        }
                    }
                });
            } catch (err) {
                console.error("Error fetching universities:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch universities",
                    error: {
                        code: "FETCH_ERROR",
                        timestamp: new Date().toISOString()
                    }
                });
            }

        case "POST":
            try {
                const {
                    name,
                    nameAr,
                    city,
                    cityAr,
                    type,
                    description,
                    descriptionAr,
                    website,
                    email,
                    phone,
                    address,
                    programs,
                    tuitionFee,
                    applicationFee,
                    currency,
                    gpaRequirement,
                    languageTest,
                    documents,
                    featured
                } = req.body;

                // Validate required fields
                if (!name || !city || !type) {
                    return res.status(400).json({
                        success: false,
                        message: "Name, city, and type are required",
                        error: {
                            code: "VALIDATION_ERROR",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                // Check if university already exists
                const existingUniversity = await University.findOne({ name, city });
                if (existingUniversity) {
                    return res.status(409).json({
                        success: false,
                        message: "University with this name already exists in this city",
                        error: {
                            code: "DUPLICATE_UNIVERSITY",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                const universityData = {
                    name,
                    nameAr,
                    city,
                    cityAr,
                    type,
                    description,
                    descriptionAr,
                    contact: {
                        website,
                        email,
                        phone,
                        address
                    },
                    programs: programs || [],
                    fees: {
                        tuition: tuitionFee,
                        application: applicationFee,
                        currency: currency || 'USD'
                    },
                    requirements: {
                        gpa: gpaRequirement,
                        languageTest,
                        documents: documents || []
                    },
                    featured: featured || false,
                    isActive: true
                };

                const university = await University.create(universityData);

                return res.status(201).json({
                    success: true,
                    message: "University created successfully",
                    data: university,
                    meta: {
                        timestamp: new Date().toISOString()
                    }
                });
            } catch (err) {
                console.error("Error creating university:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to create university",
                    error: {
                        code: "CREATE_ERROR",
                        details: err.message,
                        timestamp: new Date().toISOString()
                    }
                });
            }

        default:
            return res.status(405).json({
                success: false,
                message: "Method not allowed",
                error: {
                    code: "METHOD_NOT_ALLOWED",
                    timestamp: new Date().toISOString()
                }
            });
    }
}

export default withAdminAuth(handler);