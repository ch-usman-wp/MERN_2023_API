import jwt from 'jsonwebtoken';  
import { User } from '../models/user.model.js'; 


export const isAuthenticated = async (req, res, next) => {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;
    const token = cookieToken || bearerToken;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Please login"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login session"
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}