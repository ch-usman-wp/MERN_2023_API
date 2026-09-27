import bcrypt from 'bcrypt';

import {User} from '../models/user.model.js'; 
import { genrateCookie } from '../utilities/features.js';

export const userRegister = async (req, res)=>{
    const {name, email, password} = req.body;

    let userExist = await User.findOne({email});
    
    if(userExist) return res.status(400).json({
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
   const {email,password} = req.body  
    let user = await User.findOne({email});
    if(!user) return res.status(400).json({
        success:false,
        messge:"User Not exist"
    })
    const isMatch = await bcrypt.compare(password,user.password)  
    if(!isMatch)return res.status(400).json({
        success:false,
        message:"Invalid credential"
    })
    generateCookie(user,res,201,`Welcome ${user.name}`)
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

export const getUserById = async (req, res)=>{
    const id = req.params.id;

    const user = await User.findById(id);
    
    if(!user) return res.status(404).json({
        success:false,
        message:"Invalid ID"
    })

    res.json({
        success:true,
        message:"This is single user",
        user
    })
}