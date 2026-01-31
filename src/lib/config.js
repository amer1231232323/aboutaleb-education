/**
 * Configuration Management System
 * Validates environment variables and provides default values
 */

import { z } from 'zod';

/**
 * Environment variable validation schema
 */
const configSchema = z.object({
    // Database Configuration
    MONGODB_URI: z.string()
        .min(1, "MONGODB_URI is required")
        .url("MONGODB_URI must be a valid URL"),

    // JWT Configuration
    JWT_SECRET: z.string()
        .min(32, "JWT_SECRET must be at least 32 characters long for security"),

    JWT_EXPIRES_IN: z.string()
        .default("7d")
        .refine(val => /^\d+[smhdw]$/.test(val), "JWT_EXPIRES_IN must be in format like '7d', '24h', '60m'"),

    // Application Configuration
    NODE_ENV: z.enum(["development", "production", "test"])
        .default("development"),

    PORT: z.string()
        .regex(/^\d+$/, "PORT must be a number")
        .transform(val => parseInt(val))
        .default("3000"),

    // Next.js Configuration
    NEXTAUTH_URL: z.string()
        .url("NEXTAUTH_URL must be a valid URL")
        .optional(),

    NEXTAUTH_SECRET: z.string()
        .min(32, "NEXTAUTH_SECRET must be at least 32 characters long")
        .optional(),

    // File Upload Configuration
    MAX_FILE_SIZE: z.string()
        .regex(/^\d+$/, "MAX_FILE_SIZE must be a number in bytes")
        .transform(val => parseInt(val))
        .default("10485760"), // 10MB default

    MAX_IMAGE_SIZE: z.string()
        .regex(/^\d+$/, "MAX_IMAGE_SIZE must be a number in bytes")
        .transform(val => parseInt(val))
        .default("5242880"), // 5MB default

    UPLOAD_DIR: z.string()
        .default("public/uploads"),

    // Email Configuration (optional)
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string()
        .regex(/^\d+$/, "SMTP_PORT must be a number")
        .transform(val => parseInt(val))
        .optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    FROM_EMAIL: z.string().email("FROM_EMAIL must be a valid email").optional(),

    // WhatsApp Configuration
    WHATSAPP_NUMBER: z.string()
        .regex(/^\+?[\d\s\-\(\)]{10,20}$/, "WHATSAPP_NUMBER must be a valid phone number")
        .default("+905015959880"),

    // Social Media Links
    FACEBOOK_URL: z.string().url("FACEBOOK_URL must be a valid URL").optional(),
    INSTAGRAM_URL: z.string().url("INSTAGRAM_URL must be a valid URL").optional(),
    TWITTER_URL: z.string().url("TWITTER_URL must be a valid URL").optional(),
    LINKEDIN_URL: z.string().url("LINKEDIN_URL must be a valid URL").optional(),

    // External Services
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),

    // Analytics
    GOOGLE_ANALYTICS_ID: z.string().optional(),

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: z.string()
        .regex(/^\d+$/, "RATE_LIMIT_WINDOW_MS must be a number")
        .transform(val => parseInt(val))
        .default("900000"), // 15 minutes

    RATE_LIMIT_MAX_REQUESTS: z.string()
        .regex(/^\d+$/, "RATE_LIMIT_MAX_REQUESTS must be a number")
        .transform(val => parseInt(val))
        .default("100"),

    // Security
    BCRYPT_ROUNDS: z.string()
        .regex(/^\d+$/, "BCRYPT_ROUNDS must be a number")
        .transform(val => parseInt(val))
        .refine(val => val >= 10 && val <= 15, "BCRYPT_ROUNDS should be between 10 and 15")
        .default("12"),

    // Logging
    LOG_LEVEL: z.enum(["error", "warn", "info", "debug"])
        .default("info"),

    // Application Features
    ENABLE_REGISTRATION: z.string()
        .transform(val => val === "true")
        .default("true"),

    ENABLE_EMAIL_VERIFICATION: z.string()
        .transform(val => val === "true")
        .default("false"),

    MAINTENANCE_MODE: z.string()
        .transform(val => val === "true")
        .default("false"),

    // Company Information
    COMPANY_NAME: z.string()
        .default("ABOU-TALEB EDUCATION"),

    COMPANY_EMAIL: z.string()
        .email("COMPANY_EMAIL must be a valid email")
        .default("info@abou-taleb.com"),

    COMPANY_PHONE: z.string()
        .regex(/^\+?[\d\s\-\(\)]{10,20}$/, "COMPANY_PHONE must be a valid phone number")
        .default("+905015959880"),

    COMPANY_ADDRESS: z.string()
        .default("Istanbul, Turkey"),

    // Supported Languages
    SUPPORTED_LANGUAGES: z.string()
        .default("en,tr,ar,fa,fr,ru")
        .transform(val => val.split(",")),

    DEFAULT_LANGUAGE: z.string()
        .default("en"),

    // Pagination Defaults
    DEFAULT_PAGE_SIZE: z.string()
        .regex(/^\d+$/, "DEFAULT_PAGE_SIZE must be a number")
        .transform(val => parseInt(val))
        .default("10"),

    MAX_PAGE_SIZE: z.string()
        .regex(/^\d+$/, "MAX_PAGE_SIZE must be a number")
        .transform(val => parseInt(val))
        .default("100")
});

/**
 * Configuration object with validated values
 */
let config = null;

/**
 * Load and validate configuration
 * @returns {object} Validated configuration object
 */
export function loadConfig() {
    if (config) {
        return config;
    }

    try {
        // Load environment variables
        const env = process.env;

        // Validate configuration
        config = configSchema.parse(env);

        // Log successful configuration load
        if (config.NODE_ENV === 'development') {
            console.log('✅ Configuration loaded successfully');
            console.log(`📊 Environment: ${config.NODE_ENV}`);
            console.log(`🚀 Port: ${config.PORT}`);
            console.log(`🗄️  Database: ${config.MONGODB_URI ? 'Connected' : 'Not configured'}`);
            console.log(`🔐 JWT Secret: ${config.JWT_SECRET ? 'Configured' : 'Missing'}`);
            console.log(`📧 Email: ${config.SMTP_HOST ? 'Configured' : 'Not configured'}`);
            console.log(`☁️  Cloudinary: ${config.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured'}`);
        }

        return config;
    } catch (error) {
        console.error('❌ Configuration validation failed:');

        if (error instanceof z.ZodError) {
            error.errors.forEach(err => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
        } else {
            console.error(error.message);
        }

        // In production, exit the process if configuration is invalid
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }

        throw error;
    }
}

/**
 * Get configuration value by key
 * @param {string} key - Configuration key
 * @param {any} defaultValue - Default value if key not found
 * @returns {any} Configuration value
 */
export function getConfig(key, defaultValue = null) {
    const cfg = loadConfig();
    return cfg[key] ?? defaultValue;
}

/**
 * Check if a feature is enabled
 * @param {string} feature - Feature name
 * @returns {boolean} True if feature is enabled
 */
export function isFeatureEnabled(feature) {
    const cfg = loadConfig();

    switch (feature) {
        case 'registration':
            return cfg.ENABLE_REGISTRATION;
        case 'emailVerification':
            return cfg.ENABLE_EMAIL_VERIFICATION;
        case 'maintenanceMode':
            return cfg.MAINTENANCE_MODE;
        case 'email':
            return !!(cfg.SMTP_HOST && cfg.SMTP_USER && cfg.SMTP_PASS);
        case 'cloudinary':
            return !!(cfg.CLOUDINARY_CLOUD_NAME && cfg.CLOUDINARY_API_KEY && cfg.CLOUDINARY_API_SECRET);
        case 'analytics':
            return !!cfg.GOOGLE_ANALYTICS_ID;
        default:
            return false;
    }
}

/**
 * Get database configuration
 * @returns {object} Database configuration
 */
export function getDatabaseConfig() {
    const cfg = loadConfig();
    return {
        uri: cfg.MONGODB_URI,
        options: {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    };
}

/**
 * Get JWT configuration
 * @returns {object} JWT configuration
 */
export function getJWTConfig() {
    const cfg = loadConfig();
    return {
        secret: cfg.JWT_SECRET,
        expiresIn: cfg.JWT_EXPIRES_IN,
        algorithm: 'HS256'
    };
}

/**
 * Get file upload configuration
 * @returns {object} File upload configuration
 */
export function getUploadConfig() {
    const cfg = loadConfig();
    return {
        maxFileSize: cfg.MAX_FILE_SIZE,
        maxImageSize: cfg.MAX_IMAGE_SIZE,
        uploadDir: cfg.UPLOAD_DIR,
        allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        allowedDocumentTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ]
    };
}

/**
 * Get email configuration
 * @returns {object|null} Email configuration or null if not configured
 */
export function getEmailConfig() {
    const cfg = loadConfig();

    if (!isFeatureEnabled('email')) {
        return null;
    }

    return {
        host: cfg.SMTP_HOST,
        port: cfg.SMTP_PORT,
        secure: cfg.SMTP_PORT === 465,
        auth: {
            user: cfg.SMTP_USER,
            pass: cfg.SMTP_PASS
        },
        from: cfg.FROM_EMAIL || cfg.COMPANY_EMAIL
    };
}

/**
 * Get rate limiting configuration
 * @returns {object} Rate limiting configuration
 */
export function getRateLimitConfig() {
    const cfg = loadConfig();
    return {
        windowMs: cfg.RATE_LIMIT_WINDOW_MS,
        max: cfg.RATE_LIMIT_MAX_REQUESTS,
        message: {
            success: false,
            message: "Too many requests, please try again later.",
            error: {
                code: "RATE_LIMIT_EXCEEDED",
                timestamp: new Date().toISOString()
            }
        }
    };
}

/**
 * Get company information
 * @returns {object} Company information
 */
export function getCompanyInfo() {
    const cfg = loadConfig();
    return {
        name: cfg.COMPANY_NAME,
        email: cfg.COMPANY_EMAIL,
        phone: cfg.COMPANY_PHONE,
        whatsapp: cfg.WHATSAPP_NUMBER,
        address: cfg.COMPANY_ADDRESS,
        socialMedia: {
            facebook: cfg.FACEBOOK_URL,
            instagram: cfg.INSTAGRAM_URL,
            twitter: cfg.TWITTER_URL,
            linkedin: cfg.LINKEDIN_URL
        }
    };
}

/**
 * Get pagination configuration
 * @returns {object} Pagination configuration
 */
export function getPaginationConfig() {
    const cfg = loadConfig();
    return {
        defaultPageSize: cfg.DEFAULT_PAGE_SIZE,
        maxPageSize: cfg.MAX_PAGE_SIZE
    };
}

/**
 * Get internationalization configuration
 * @returns {object} i18n configuration
 */
export function getI18nConfig() {
    const cfg = loadConfig();
    return {
        supportedLanguages: cfg.SUPPORTED_LANGUAGES,
        defaultLanguage: cfg.DEFAULT_LANGUAGE,
        fallbackLanguage: 'en'
    };
}

/**
 * Validate required environment variables on startup
 */
export function validateRequiredConfig() {
    const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
    const missing = [];

    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });

    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(varName => {
            console.error(`  - ${varName}`);
        });

        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }

        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

/**
 * Create example .env file content
 * @returns {string} Example .env file content
 */
export function generateExampleEnv() {
    return `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/abou-taleb-platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
PORT=3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
MAX_IMAGE_SIZE=5242880
UPLOAD_DIR=public/uploads

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@abou-taleb.com

# WhatsApp Configuration
WHATSAPP_NUMBER=+905015959880

# Social Media Links (Optional)
FACEBOOK_URL=https://facebook.com/abou-taleb-education
INSTAGRAM_URL=https://instagram.com/abou-taleb-education
TWITTER_URL=https://twitter.com/abou-taleb-edu
LINKEDIN_URL=https://linkedin.com/company/abou-taleb-education

# External Services (Optional)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12

# Application Features
ENABLE_REGISTRATION=true
ENABLE_EMAIL_VERIFICATION=false
MAINTENANCE_MODE=false

# Company Information
COMPANY_NAME=ABOU-TALEB EDUCATION
COMPANY_EMAIL=info@abou-taleb.com
COMPANY_PHONE=+905015959880
COMPANY_ADDRESS=Istanbul, Turkey

# Internationalization
SUPPORTED_LANGUAGES=en,tr,ar,fa,fr,ru
DEFAULT_LANGUAGE=en

# Pagination
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100
`;
}

// Initialize configuration on module load
try {
    loadConfig();
} catch (error) {
    // Configuration will be loaded when needed
}

export default {
    loadConfig,
    getConfig,
    isFeatureEnabled,
    getDatabaseConfig,
    getJWTConfig,
    getUploadConfig,
    getEmailConfig,
    getRateLimitConfig,
    getCompanyInfo,
    getPaginationConfig,
    getI18nConfig,
    validateRequiredConfig,
    generateExampleEnv
};