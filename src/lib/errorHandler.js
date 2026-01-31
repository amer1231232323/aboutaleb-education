/**
 * Centralized Error Handler
 * Provides consistent error classification, logging, and response formatting
 */

import { logSecurityEvent } from './unifiedAuth';
import {
    createErrorResponse,
    createServerErrorResponse,
    createValidationErrorResponse,
    createNotFoundResponse,
    createConflictResponse,
    createUnauthorizedResponse,
    createForbiddenResponse
} from './responseFormatter';

/**
 * Error types and their classifications
 */
export const ERROR_TYPES = {
    // Authentication & Authorization
    AUTH_REQUIRED: 'AUTH_REQUIRED',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

    // Validation
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
    INVALID_FORMAT: 'INVALID_FORMAT',
    INVALID_VALUE: 'INVALID_VALUE',

    // Database
    DATABASE_ERROR: 'DATABASE_ERROR',
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
    NOT_FOUND: 'NOT_FOUND',
    CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',

    // Business Logic
    BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
    OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
    RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',

    // External Services
    EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',

    // File Operations
    FILE_NOT_FOUND: 'FILE_NOT_FOUND',
    FILE_TOO_LARGE: 'FILE_TOO_LARGE',
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
    UPLOAD_ERROR: 'UPLOAD_ERROR',

    // Rate Limiting
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

    // Generic
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
};

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
    constructor(message, type = ERROR_TYPES.UNKNOWN_ERROR, statusCode = 500, details = null, severity = ERROR_SEVERITY.MEDIUM) {
        super(message);
        this.name = 'AppError';
        this.type = type;
        this.statusCode = statusCode;
        this.details = details;
        this.severity = severity;
        this.timestamp = new Date().toISOString();

        // Capture stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}

/**
 * Log error with appropriate level and context
 * @param {Error} error - Error object
 * @param {object} context - Additional context information
 * @param {object} req - Request object (optional)
 */
export function logError(error, context = {}, req = null) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        error: {
            name: error.name,
            message: error.message,
            type: error.type || ERROR_TYPES.UNKNOWN_ERROR,
            statusCode: error.statusCode || 500,
            severity: error.severity || ERROR_SEVERITY.MEDIUM,
            stack: error.stack
        },
        context,
        request: req ? {
            method: req.method,
            url: req.url,
            headers: {
                'user-agent': req.headers['user-agent'],
                'x-forwarded-for': req.headers['x-forwarded-for']
            },
            ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown',
            userId: req.user?.userId || null
        } : null
    };

    // Log based on severity
    switch (error.severity) {
        case ERROR_SEVERITY.CRITICAL:
            console.error('🚨 CRITICAL ERROR:', JSON.stringify(logEntry, null, 2));
            break;
        case ERROR_SEVERITY.HIGH:
            console.error('🔴 HIGH SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
            break;
        case ERROR_SEVERITY.MEDIUM:
            console.error('🟡 MEDIUM SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
            break;
        case ERROR_SEVERITY.LOW:
            console.warn('🟢 LOW SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
            break;
        default:
            console.error('❓ UNKNOWN SEVERITY ERROR:', JSON.stringify(logEntry, null, 2));
    }

    // Log security events
    if (isSecurityRelatedError(error)) {
        logSecurityEvent('ERROR_OCCURRED', {
            errorType: error.type,
            message: error.message,
            severity: error.severity
        }, req);
    }

    // In production, you might want to send critical errors to external monitoring
    if (process.env.NODE_ENV === 'production' && error.severity === ERROR_SEVERITY.CRITICAL) {
        // Send to monitoring service (e.g., Sentry, DataDog, etc.)
        // sendToMonitoringService(logEntry);
    }
}

/**
 * Check if error is security-related
 * @param {Error} error - Error object
 * @returns {boolean} True if security-related
 */
function isSecurityRelatedError(error) {
    const securityErrorTypes = [
        ERROR_TYPES.AUTH_REQUIRED,
        ERROR_TYPES.INVALID_TOKEN,
        ERROR_TYPES.TOKEN_EXPIRED,
        ERROR_TYPES.INSUFFICIENT_PERMISSIONS,
        ERROR_TYPES.RATE_LIMIT_EXCEEDED
    ];

    return securityErrorTypes.includes(error.type);
}

/**
 * Classify error and return appropriate response
 * @param {Error} error - Error object
 * @param {object} req - Request object (optional)
 * @returns {object} Standardized error response
 */
export function classifyError(error, req = null) {
    // Log the error
    logError(error, {}, req);

    // Handle specific error types
    if (error instanceof AppError) {
        return createErrorResponse(
            error.message,
            error.type,
            error.statusCode,
            error.details
        );
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
        const validationErrors = {};
        Object.keys(error.errors).forEach(key => {
            validationErrors[key] = error.errors[key].message;
        });

        return createValidationErrorResponse(
            validationErrors,
            "Validation failed"
        );
    }

    // Handle Mongoose cast errors (invalid ObjectId, etc.)
    if (error.name === 'CastError') {
        return createNotFoundResponse("Resource", error.value);
    }

    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || 'field';
        return createConflictResponse(
            `Duplicate value for ${field}`,
            { field, value: error.keyValue?.[field] }
        );
    }

    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
        return createUnauthorizedResponse("Invalid token");
    }

    if (error.name === 'TokenExpiredError') {
        return createUnauthorizedResponse("Token expired");
    }

    // Handle MongoDB connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
        return createServerErrorResponse(
            "Database connection failed",
            process.env.NODE_ENV === 'development' ? error.message : null
        );
    }

    // Handle file upload errors
    if (error.code === 'LIMIT_FILE_SIZE') {
        return createErrorResponse(
            "File too large",
            ERROR_TYPES.FILE_TOO_LARGE,
            413,
            { maxSize: error.limit }
        );
    }

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return createErrorResponse(
            "Unexpected file field",
            ERROR_TYPES.UPLOAD_ERROR,
            400,
            { field: error.field }
        );
    }

    // Generic server error
    return createServerErrorResponse(
        "An unexpected error occurred",
        process.env.NODE_ENV === 'development' ? error.message : null
    );
}

/**
 * Express error handling middleware
 * @param {Error} error - Error object
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {Function} next - Next middleware function
 */
export function errorHandlingMiddleware(error, req, res, next) {
    const errorResponse = classifyError(error, req);
    const statusCode = errorResponse.meta?.statusCode || 500;

    return res.status(statusCode).json(errorResponse);
}

/**
 * Async error wrapper for route handlers
 * @param {Function} handler - Async route handler
 * @returns {Function} Wrapped handler with error catching
 */
export function asyncErrorHandler(handler) {
    return async (req, res, next) => {
        try {
            return await handler(req, res, next);
        } catch (error) {
            const errorResponse = classifyError(error, req);
            const statusCode = errorResponse.meta?.statusCode || 500;
            return res.status(statusCode).json(errorResponse);
        }
    };
}

/**
 * Create specific error types for common scenarios
 */
export const createAuthError = (message = "Authentication required") =>
    new AppError(message, ERROR_TYPES.AUTH_REQUIRED, 401, null, ERROR_SEVERITY.MEDIUM);

export const createValidationError = (message, details = null) =>
    new AppError(message, ERROR_TYPES.VALIDATION_ERROR, 400, details, ERROR_SEVERITY.LOW);

export const createNotFoundError = (resource = "Resource", identifier = null) => {
    const message = identifier
        ? `${resource} with identifier '${identifier}' not found`
        : `${resource} not found`;
    return new AppError(message, ERROR_TYPES.NOT_FOUND, 404, { resource, identifier }, ERROR_SEVERITY.LOW);
};

export const createConflictError = (message, details = null) =>
    new AppError(message, ERROR_TYPES.RESOURCE_CONFLICT, 409, details, ERROR_SEVERITY.MEDIUM);

export const createForbiddenError = (message = "Insufficient permissions") =>
    new AppError(message, ERROR_TYPES.INSUFFICIENT_PERMISSIONS, 403, null, ERROR_SEVERITY.MEDIUM);

export const createRateLimitError = (retryAfter = 60) =>
    new AppError(
        "Too many requests. Please try again later.",
        ERROR_TYPES.RATE_LIMIT_EXCEEDED,
        429,
        { retryAfter },
        ERROR_SEVERITY.HIGH
    );

export const createDatabaseError = (message = "Database operation failed", details = null) =>
    new AppError(message, ERROR_TYPES.DATABASE_ERROR, 500, details, ERROR_SEVERITY.HIGH);

export const createFileError = (message, type = ERROR_TYPES.UPLOAD_ERROR, details = null) =>
    new AppError(message, type, 400, details, ERROR_SEVERITY.LOW);

/**
 * Error handler for unhandled promise rejections
 */
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Promise Rejection:', reason);
    logError(new AppError(
        'Unhandled Promise Rejection',
        ERROR_TYPES.SERVER_ERROR,
        500,
        { reason: reason.toString(), promise: promise.toString() },
        ERROR_SEVERITY.CRITICAL
    ));
});

/**
 * Error handler for uncaught exceptions
 */
process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', error);
    logError(new AppError(
        'Uncaught Exception',
        ERROR_TYPES.SERVER_ERROR,
        500,
        { originalError: error.message, stack: error.stack },
        ERROR_SEVERITY.CRITICAL
    ));

    // In production, you might want to gracefully shutdown
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

export default {
    AppError,
    ERROR_TYPES,
    ERROR_SEVERITY,
    logError,
    classifyError,
    errorHandlingMiddleware,
    asyncErrorHandler,
    createAuthError,
    createValidationError,
    createNotFoundError,
    createConflictError,
    createForbiddenError,
    createRateLimitError,
    createDatabaseError,
    createFileError
};