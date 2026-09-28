import jwt from 'jsonwebtoken';

export const genrateCookie = (user, res, statusCode = 200, message) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    const isProduction = process.env.NODE_ENV === 'production';

    // Avoid leaking sensitive fields (e.g. password hash) to the client
    const safeUser = user.toObject ? user.toObject() : { ...user };
    delete safeUser.password;

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        path: "/"
    }).json({
        success: true,
        message: message,
        user: safeUser,
        token   // ← YEH LINE ADD KI
    });
};