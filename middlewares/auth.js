import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const cookieToken = req.cookies?.token;
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.startsWith('Bearer ')
            ? authHeader.slice(7)
            : null;
        const token = cookieToken || bearerToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login"
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        req.user = await User.findById(decoded._id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login session"
            });
        }

        next();
    } catch (error) {
        console.error('Authentication check failed:', error.message);
        return res.status(500).json({
            success: false,
            message: "Authentication check failed"
        });
    }
};