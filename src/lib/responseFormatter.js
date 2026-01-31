/**
 * Standardized Response Formatter Utility
 * Provides consistent response formats across all API endpoints
 */

/**
 * Generate a unique request ID
 * @returns {string} Unique request ID
 */
function generateRequestId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Create standardized success response
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @param {object} meta - Additional metadata
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {object} Standardized success response
 */
export function createSuccessResponse(data, message = null, meta = {}, statusCode = 200) {
    const response = {
        success: true,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            statusCode,
            ...meta
        }
    };

    if (message) {
        response.message = message;
    }

    return response;
}

/**
 * Create standardized error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {number} statusCode - HTTP status code
 * @param {any} details - Additional error details
 * @param {object} meta - Additional metadata
 * @returns {object} Standardized error response
 */
export function createErrorResponse(message, code, statusCode = 500, details = null, meta = {}) {
    const response = {
        success: false,
        message,
        error: {
            code,
            timestamp: new Date().toISOString(),
            statusCode
        },
        meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            statusCode,
            ...meta
        }
    };

    if (details) {
        response.error.details = details;
    }

    return response;
}

/**
 * Create paginated response
 * @param {Array} data - Array of data items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @param {string} message - Success message
 * @param {object} additionalMeta - Additional metadata
 * @returns {object} Standardized paginated response
 */
export function createPaginatedResponse(data, page, limit, total, message = null, additionalMeta = {}) {
    const totalPages = Math.ceil(total / limit);

    return createSuccessResponse(data, message, {
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages,
            hasNext: parseInt(page) < totalPages,
            hasPrev: parseInt(page) > 1,
            nextPage: parseInt(page) < totalPages ? parseInt(page) + 1 : null,
            prevPage: parseInt(page) > 1 ? parseInt(page) - 1 : null
        },
        ...additionalMeta
    });
}

/**
 * Create validation error response
 * @param {Array|object} validationErrors - Validation error details
 * @param {string} message - Error message
 * @returns {object} Standardized validation error response
 */
export function createValidationErrorResponse(validationErrors, message = "Validation failed") {
    return createErrorResponse(
        message,
        "VALIDATION_ERROR",
        400,
        validationErrors
    );
}

/**
 * Create not found error response
 * @param {string} resource - Resource name that was not found
 * @param {string} identifier - Resource identifier
 * @returns {object} Standardized not found error response
 */
export function createNotFoundResponse(resource = "Resource", identifier = null) {
    const message = identifier
        ? `${resource} with identifier '${identifier}' not found`
        : `${resource} not found`;

    return createErrorResponse(
        message,
        "NOT_FOUND",
        404
    );
}

/**
 * Create unauthorized error response
 * @param {string} message - Custom error message
 * @returns {object} Standardized unauthorized error response
 */
export function createUnauthorizedResponse(message = "Unauthorized - Please login") {
    return createErrorResponse(
        message,
        "UNAUTHORIZED",
        401
    );
}

/**
 * Create forbidden error response
 * @param {string} message - Custom error message
 * @returns {object} Standardized forbidden error response
 */
export function createForbiddenResponse(message = "Forbidden - Insufficient permissions") {
    return createErrorResponse(
        message,
        "FORBIDDEN",
        403
    );
}

/**
 * Create conflict error response
 * @param {string} message - Custom error message
 * @param {any} details - Conflict details
 * @returns {object} Standardized conflict error response
 */
export function createConflictResponse(message = "Resource conflict", details = null) {
    return createErrorResponse(
        message,
        "CONFLICT",
        409,
        details
    );
}

/**
 * Create method not allowed error response
 * @param {Array} allowedMethods - Array of allowed HTTP methods
 * @returns {object} Standardized method not allowed error response
 */
export function createMethodNotAllowedResponse(allowedMethods = []) {
    const message = allowedMethods.length > 0
        ? `Method not allowed. Allowed methods: ${allowedMethods.join(', ')}`
        : "Method not allowed";

    return createErrorResponse(
        message,
        "METHOD_NOT_ALLOWED",
        405,
        { allowedMethods }
    );
}

/**
 * Create rate limit error response
 * @param {number} retryAfter - Seconds to wait before retrying
 * @returns {object} Standardized rate limit error response
 */
export function createRateLimitResponse(retryAfter = 60) {
    return createErrorResponse(
        "Too many requests. Please try again later.",
        "RATE_LIMIT_EXCEEDED",
        429,
        { retryAfter }
    );
}

/**
 * Create server error response
 * @param {string} message - Custom error message
 * @param {any} details - Error details (only in development)
 * @returns {object} Standardized server error response
 */
export function createServerErrorResponse(message = "Internal server error", details = null) {
    const response = createErrorResponse(
        message,
        "SERVER_ERROR",
        500
    );

    // Only include details in development environment
    if (details && process.env.NODE_ENV === 'development') {
        response.error.details = details;
    }

    return response;
}

/**
 * Send standardized JSON response
 * @param {object} res - Next.js response object
 * @param {object} responseData - Response data object
 * @param {number} statusCode - HTTP status code (optional, will use from responseData.meta.statusCode)
 */
export function sendResponse(res, responseData, statusCode = null) {
    const status = statusCode || responseData.meta?.statusCode || (responseData.success ? 200 : 500);
    return res.status(status).json(responseData);
}

/**
 * Middleware wrapper for consistent error handling
 * @param {Function} handler - API route handler
 * @returns {Function} Wrapped handler with error handling
 */
export function withErrorHandling(handler) {
    return async (req, res) => {
        try {
            return await handler(req, res);
        } catch (error) {
            console.error("API Error:", error);

            // Handle specific error types
            if (error.name === 'ValidationError') {
                return sendResponse(res, createValidationErrorResponse(error.errors));
            }

            if (error.name === 'CastError') {
                return sendResponse(res, createNotFoundResponse("Resource", error.value));
            }

            if (error.code === 11000) { // MongoDB duplicate key error
                return sendResponse(res, createConflictResponse("Resource already exists"));
            }

            // Generic server error
            return sendResponse(res, createServerErrorResponse("An unexpected error occurred", error.message));
        }
    };
}

/**
 * Helper function to extract pagination parameters from query
 * @param {object} query - Request query object
 * @param {object} defaults - Default pagination values
 * @returns {object} Pagination parameters
 */
export function extractPaginationParams(query, defaults = { page: 1, limit: 10 }) {
    const page = Math.max(1, parseInt(query.page) || defaults.page);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || defaults.limit)); // Max 100 items per page
    const skip = (page - 1) * limit;

    return { page, limit, skip };
}

/**
 * Helper function to extract search parameters from query
 * @param {object} query - Request query object
 * @param {Array} searchFields - Fields to search in
 * @returns {object} Search filters
 */
export function extractSearchParams(query, searchFields = []) {
    const filters = {};

    if (query.search && searchFields.length > 0) {
        filters.$or = searchFields.map(field => ({
            [field]: { $regex: query.search, $options: 'i' }
        }));
    }

    return filters;
}

export default {
    createSuccessResponse,
    createErrorResponse,
    createPaginatedResponse,
    createValidationErrorResponse,
    createNotFoundResponse,
    createUnauthorizedResponse,
    createForbiddenResponse,
    createConflictResponse,
    createMethodNotAllowedResponse,
    createRateLimitResponse,
    createServerErrorResponse,
    sendResponse,
    withErrorHandling,
    extractPaginationParams,
    extractSearchParams
};