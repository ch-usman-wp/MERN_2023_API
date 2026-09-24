import bcrypt from 'bcrypt';

import {User} from '../models/user.model.js'; 
import { genrateCookie } from '../utilities/features.js';

export const userRegister = async (req, res)=>{
    const {name, email, password} = req.body;

    let userExist = await User.findOne({email});
    
    if(userExist) return res.status(201).json({
        success: false,
        message: 'User already exist'
    })
    
    const hashedPassword = await bcrypt.hash(password, 10);

     const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

   genrateCookie(user, res, 201, 'User created successfully');
   
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

          // Find user
        const user = await User.findOne({ email });

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

      

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
  
        // Compare password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // Don't send password to client
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        genrateCookie(userResponse, res, 200, 'User logged in successfully');

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const getMyProfile = (req, res) => {
   res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user: req.user       
    }) 
}

export const userLogout = (req, res) => {
    res.status(200).cookie("token", "" , {
        expires: new Date(0),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully"
    })
}