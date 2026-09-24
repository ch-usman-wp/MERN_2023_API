import jwt from 'jsonwebtoken'; 

export const genrateCookie = (user, res, statusCode=200, message) =>{
     const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
     const isProduction = process.env.NODE_ENV === 'production';

        res.status(statusCode).cookie("token", token,{
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
        }).json({
            success: true,
            message: message,
            user
        })
}