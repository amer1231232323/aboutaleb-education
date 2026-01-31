import jwt from 'jsonwebtoken';
import {
    verifyToken,
    getUserFromRequest,
    checkRole,
    withAuth,
    withAdminAuth,
    withStudentAuth,
    isAdminRequest,
    signToken
} from './unifiedAuth.js';

// Mock environment variable
process.env.JWT_SECRET = 'test-secret-key';

describe('Unified Authentication Middleware', () => {
    const mockAdminUser = {
        _id: 'admin123',
        email: 'admin@test.com',
        role: 'admin'
    };

    const mockStudentUser = {
        _id: 'student123',
        email: 'student@test.com',
        role: 'student'
    };

    describe('verifyToken', () => {
        test('should verify valid token', () => {
            const token = signToken(mockAdminUser);
            const decoded = verifyToken(token);

            expect(decoded).toBeTruthy();
            expect(decoded.id).toBe(mockAdminUser._id);
            expect(decoded.email).toBe(mockAdminUser.email);
            expect(decoded.role).toBe(mockAdminUser.role);
        });

        test('should return null for invalid token', () => {
            const result = verifyToken('invalid-token');
            expect(result).toBeNull();
        });

        test('should return null for null token', () => {
            const result = verifyToken(null);
            expect(result).toBeNull();
        });

        test('should return null for empty token', () => {
            const result = verifyToken('');
            expect(result).toBeNull();
        });
    });

    describe('getUserFromRequest', () => {
        test('should extract user from valid request', () => {
            const token = signToken(mockAdminUser);
            const req = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };

            const user = getUserFromRequest(req);
            expect(user).toBeTruthy();
            expect(user.id).toBe(mockAdminUser._id);
        });

        test('should return null for request without authorization header', () => {
            const req = { headers: {} };
            const user = getUserFromRequest(req);
            expect(user).toBeNull();
        });

        test('should return null for malformed authorization header', () => {
            const req = {
                headers: {
                    authorization: 'InvalidFormat token'
                }
            };
            const user = getUserFromRequest(req);
            expect(user).toBeNull();
        });
    });

    describe('checkRole', () => {
        test('should return true for matching role', () => {
            const user = { role: 'admin' };
            expect(checkRole(user, 'admin')).toBe(true);
        });

        test('should return false for non-matching role', () => {
            const user = { role: 'student' };
            expect(checkRole(user, 'admin')).toBe(false);
        });

        test('should return false for user without role', () => {
            const user = {};
            expect(checkRole(user, 'admin')).toBe(false);
        });

        test('should return false for null user', () => {
            expect(checkRole(null, 'admin')).toBe(false);
        });
    });

    describe('withAdminAuth middleware', () => {
        test('should allow access for valid admin', async () => {
            const token = signToken(mockAdminUser);
            const req = {
                headers: { authorization: `Bearer ${token}` },
                url: '/api/admin/test'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockHandler = jest.fn();
            const protectedHandler = withAdminAuth(mockHandler);

            await protectedHandler(req, res);

            expect(mockHandler).toHaveBeenCalledWith(req, res);
            expect(req.user).toBeTruthy();
            expect(req.user.role).toBe('admin');
        });

        test('should deny access for non-admin user', async () => {
            const token = signToken(mockStudentUser);
            const req = {
                headers: { authorization: `Bearer ${token}` },
                url: '/api/admin/test'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockHandler = jest.fn();
            const protectedHandler = withAdminAuth(mockHandler);

            await protectedHandler(req, res);

            expect(mockHandler).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: expect.objectContaining({
                        code: 'FORBIDDEN'
                    })
                })
            );
        });

        test('should deny access for missing token', async () => {
            const req = {
                headers: {},
                url: '/api/admin/test'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockHandler = jest.fn();
            const protectedHandler = withAdminAuth(mockHandler);

            await protectedHandler(req, res);

            expect(mockHandler).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: expect.objectContaining({
                        code: 'UNAUTHORIZED'
                    })
                })
            );
        });
    });

    describe('isAdminRequest', () => {
        test('should return true for valid admin request', () => {
            const token = signToken(mockAdminUser);
            const req = {
                headers: { authorization: `Bearer ${token}` }
            };

            expect(isAdminRequest(req)).toBe(true);
        });

        test('should return false for student request', () => {
            const token = signToken(mockStudentUser);
            const req = {
                headers: { authorization: `Bearer ${token}` }
            };

            expect(isAdminRequest(req)).toBe(false);
        });

        test('should return false for request without token', () => {
            const req = { headers: {} };
            expect(isAdminRequest(req)).toBe(false);
        });
    });

    describe('signToken', () => {
        test('should create valid JWT token', () => {
            const token = signToken(mockAdminUser);
            expect(token).toBeTruthy();

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            expect(decoded.id).toBe(mockAdminUser._id);
            expect(decoded.email).toBe(mockAdminUser.email);
            expect(decoded.role).toBe(mockAdminUser.role);
        });

        test('should throw error for invalid user object', () => {
            expect(() => signToken({})).toThrow();
        });
    });
});