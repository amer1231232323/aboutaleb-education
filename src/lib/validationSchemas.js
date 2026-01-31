/**
 * Zod Validation Schemas
 * Centralized validation schemas for all forms and API endpoints
 */

import { z } from 'zod';

// Common validation patterns
const emailSchema = z.string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters");

const passwordSchema = z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password must be less than 128 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number");

const phoneSchema = z.string()
    .regex(/^\+?[\d\s\-\(\)]{10,20}$/, "Invalid phone number format")
    .optional()
    .or(z.literal(""));

const objectIdSchema = z.string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const urlSchema = z.string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal(""));

// User validation schemas
export const userRegistrationSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Name can only contain letters and spaces"),

    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z.string(),

    phone: phoneSchema,

    role: z.enum(["student", "admin"], {
        errorMap: () => ({ message: "Role must be either 'student' or 'admin'" })
    }).default("student"),

    acceptTerms: z.boolean()
        .refine(val => val === true, "You must accept the terms and conditions")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const userLoginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required")
});

export const userUpdateSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Name can only contain letters and spaces"),

    email: emailSchema,

    phone: phoneSchema,

    role: z.enum(["student", "admin"], {
        errorMap: () => ({ message: "Role must be either 'student' or 'admin'" })
    }),

    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(128, "Password must be less than 128 characters")
        .optional()
        .or(z.literal(""))
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"]
});

// University validation schemas
export const universityCreateSchema = z.object({
    name: z.string()
        .min(2, "University name must be at least 2 characters long")
        .max(200, "University name must be less than 200 characters"),

    nameAr: z.string()
        .max(200, "Arabic name must be less than 200 characters")
        .optional()
        .or(z.literal("")),

    city: z.string()
        .min(2, "City must be at least 2 characters long")
        .max(100, "City must be less than 100 characters"),

    cityAr: z.string()
        .max(100, "Arabic city name must be less than 100 characters")
        .optional()
        .or(z.literal("")),

    type: z.enum(["public", "private", "foundation"], {
        errorMap: () => ({ message: "Type must be 'public', 'private', or 'foundation'" })
    }),

    description: z.string()
        .max(2000, "Description must be less than 2000 characters")
        .optional()
        .or(z.literal("")),

    descriptionAr: z.string()
        .max(2000, "Arabic description must be less than 2000 characters")
        .optional()
        .or(z.literal("")),

    website: urlSchema,

    email: z.string()
        .email("Invalid email format")
        .optional()
        .or(z.literal("")),

    phone: phoneSchema,

    address: z.string()
        .max(500, "Address must be less than 500 characters")
        .optional()
        .or(z.literal("")),

    programs: z.array(z.string().max(200, "Program name must be less than 200 characters"))
        .default([]),

    tuitionFee: z.number()
        .min(0, "Tuition fee must be a positive number")
        .optional(),

    applicationFee: z.number()
        .min(0, "Application fee must be a positive number")
        .optional(),

    currency: z.string()
        .length(3, "Currency must be a 3-letter code (e.g., USD, EUR)")
        .default("USD"),

    gpaRequirement: z.number()
        .min(0, "GPA requirement must be between 0 and 4")
        .max(4, "GPA requirement must be between 0 and 4")
        .optional(),

    languageTest: z.string()
        .max(100, "Language test name must be less than 100 characters")
        .optional()
        .or(z.literal("")),

    documents: z.array(z.string().max(200, "Document name must be less than 200 characters"))
        .default([]),

    featured: z.boolean().default(false),

    isActive: z.boolean().default(true)
});

export const universityUpdateSchema = universityCreateSchema.partial();

// Application validation schemas
export const applicationCreateSchema = z.object({
    studentId: objectIdSchema,

    universityId: objectIdSchema,

    status: z.enum([
        "pending",
        "accepted",
        "rejected",
        "missing_documents",
        "under_review",
        "interview_scheduled",
        "waitlisted"
    ], {
        errorMap: () => ({ message: "Invalid application status" })
    }).default("pending"),

    priority: z.enum(["low", "normal", "high", "urgent"], {
        errorMap: () => ({ message: "Priority must be 'low', 'normal', 'high', or 'urgent'" })
    }).default("normal"),

    flags: z.array(z.enum([
        "incomplete_documents",
        "requires_interview",
        "scholarship_candidate",
        "special_needs",
        "urgent_processing"
    ])).default([]),

    notes: z.string()
        .max(2000, "Notes must be less than 2000 characters")
        .optional()
        .or(z.literal("")),

    source: z.enum([
        "website",
        "agent",
        "referral",
        "social_media",
        "advertisement"
    ], {
        errorMap: () => ({ message: "Invalid application source" })
    }).default("website"),

    applicationData: z.object({
        documents: z.array(z.object({
            name: z.string().max(200, "Document name must be less than 200 characters"),
            url: z.string().url("Invalid document URL"),
            uploadedAt: z.date().optional(),
            verified: z.boolean().default(false)
        })).default([]),

        personalInfo: z.object({
            gpa: z.number().min(0).max(4).optional(),
            languageTest: z.object({
                type: z.string().max(50, "Language test type must be less than 50 characters"),
                score: z.number().min(0).optional(),
                date: z.date().optional()
            }).optional(),
            previousEducation: z.string().max(1000, "Previous education must be less than 1000 characters").optional(),
            workExperience: z.string().max(1000, "Work experience must be less than 1000 characters").optional()
        }).default({}),

        preferences: z.object({
            program: z.string().max(200, "Program name must be less than 200 characters").optional(),
            startDate: z.date().optional(),
            accommodationNeeded: z.boolean().default(false)
        }).default({})
    }).default({
        documents: [],
        personalInfo: {},
        preferences: {}
    }),

    adminNote: z.string()
        .max(1000, "Admin note must be less than 1000 characters")
        .optional()
        .or(z.literal(""))
});

export const applicationUpdateSchema = z.object({
    status: z.enum([
        "pending",
        "accepted",
        "rejected",
        "missing_documents",
        "under_review",
        "interview_scheduled",
        "waitlisted"
    ]).optional(),

    priority: z.enum(["low", "normal", "high", "urgent"]).optional(),

    flags: z.array(z.enum([
        "incomplete_documents",
        "requires_interview",
        "scholarship_candidate",
        "special_needs",
        "urgent_processing"
    ])).optional(),

    notes: z.string()
        .max(2000, "Notes must be less than 2000 characters")
        .optional(),

    applicationData: z.object({
        documents: z.array(z.object({
            name: z.string().max(200),
            url: z.string().url(),
            uploadedAt: z.date().optional(),
            verified: z.boolean().default(false)
        })).optional(),

        personalInfo: z.object({
            gpa: z.number().min(0).max(4).optional(),
            languageTest: z.object({
                type: z.string().max(50),
                score: z.number().min(0).optional(),
                date: z.date().optional()
            }).optional(),
            previousEducation: z.string().max(1000).optional(),
            workExperience: z.string().max(1000).optional()
        }).optional(),

        preferences: z.object({
            program: z.string().max(200).optional(),
            startDate: z.date().optional(),
            accommodationNeeded: z.boolean().optional()
        }).optional()
    }).optional(),

    lastContactDate: z.date().optional(),
    nextFollowUpDate: z.date().optional(),
    externalApplicationId: z.string().max(100).optional(),

    adminNote: z.string()
        .max(1000, "Admin note must be less than 1000 characters")
        .optional(),

    adminNoteType: z.enum([
        "status_change",
        "general",
        "follow_up",
        "document_review",
        "interview"
    ]).default("general"),

    adminNotePrivate: z.boolean().default(false),

    statusChangeReason: z.string()
        .max(500, "Status change reason must be less than 500 characters")
        .optional()
});

// Admin note validation schema
export const adminNoteSchema = z.object({
    note: z.string()
        .min(1, "Note cannot be empty")
        .max(1000, "Note must be less than 1000 characters"),

    type: z.enum([
        "status_change",
        "general",
        "follow_up",
        "document_review",
        "interview"
    ]).default("general"),

    isPrivate: z.boolean().default(false)
});

// File upload validation schemas
export const fileUploadSchema = z.object({
    filename: z.string()
        .min(1, "Filename is required")
        .max(255, "Filename must be less than 255 characters"),

    mimetype: z.string()
        .regex(/^(image|application|text)\//, "Invalid file type"),

    size: z.number()
        .max(10 * 1024 * 1024, "File size must be less than 10MB") // 10MB limit
});

export const imageUploadSchema = z.object({
    filename: z.string()
        .min(1, "Filename is required")
        .max(255, "Filename must be less than 255 characters"),

    mimetype: z.string()
        .regex(/^image\/(jpeg|jpg|png|gif|webp)$/, "Only JPEG, PNG, GIF, and WebP images are allowed"),

    size: z.number()
        .max(5 * 1024 * 1024, "Image size must be less than 5MB") // 5MB limit for images
});

// Search and filter validation schemas
export const paginationSchema = z.object({
    page: z.string()
        .regex(/^\d+$/, "Page must be a positive number")
        .transform(val => Math.max(1, parseInt(val)))
        .default("1"),

    limit: z.string()
        .regex(/^\d+$/, "Limit must be a positive number")
        .transform(val => Math.min(100, Math.max(1, parseInt(val)))) // Max 100 items per page
        .default("10")
});

export const searchSchema = z.object({
    search: z.string()
        .max(200, "Search term must be less than 200 characters")
        .optional(),

    sortBy: z.string()
        .max(50, "Sort field must be less than 50 characters")
        .default("createdAt"),

    sortOrder: z.enum(["asc", "desc"], {
        errorMap: () => ({ message: "Sort order must be 'asc' or 'desc'" })
    }).default("desc")
});

// Contact form validation schema
export const contactFormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be less than 100 characters"),

    email: emailSchema,

    phone: phoneSchema,

    subject: z.string()
        .min(5, "Subject must be at least 5 characters long")
        .max(200, "Subject must be less than 200 characters"),

    message: z.string()
        .min(10, "Message must be at least 10 characters long")
        .max(2000, "Message must be less than 2000 characters"),

    preferredContact: z.enum(["email", "phone", "whatsapp"], {
        errorMap: () => ({ message: "Invalid preferred contact method" })
    }).default("email")
});

/**
 * Validation helper functions
 */

/**
 * Validate data against a schema and return formatted errors
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {object} Validation result with success flag and errors
 */
export function validateData(schema, data) {
    try {
        const validatedData = schema.parse(data);
        return {
            success: true,
            data: validatedData,
            errors: null
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = {};
            error.errors.forEach(err => {
                const path = err.path.join('.');
                formattedErrors[path] = err.message;
            });

            return {
                success: false,
                data: null,
                errors: formattedErrors
            };
        }

        return {
            success: false,
            data: null,
            errors: { general: "Validation failed" }
        };
    }
}

/**
 * Middleware to validate request body against a schema
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
export function validateBody(schema) {
    return (req, res, next) => {
        const validation = validateData(schema, req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.errors
            });
        }

        req.validatedBody = validation.data;
        next();
    };
}

/**
 * Middleware to validate query parameters against a schema
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
export function validateQuery(schema) {
    return (req, res, next) => {
        const validation = validateData(schema, req.query);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid query parameters",
                errors: validation.errors
            });
        }

        req.validatedQuery = validation.data;
        next();
    };
}

export default {
    // User schemas
    userRegistrationSchema,
    userLoginSchema,
    userUpdateSchema,
    changePasswordSchema,

    // University schemas
    universityCreateSchema,
    universityUpdateSchema,

    // Application schemas
    applicationCreateSchema,
    applicationUpdateSchema,
    adminNoteSchema,

    // File upload schemas
    fileUploadSchema,
    imageUploadSchema,

    // Utility schemas
    paginationSchema,
    searchSchema,
    contactFormSchema,

    // Helper functions
    validateData,
    validateBody,
    validateQuery
};