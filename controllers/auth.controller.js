import User from "../models/user.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) =>{
    //destructure the request body
    const {username, email, password, role} = req.body

    //Check email is already exist
    const emailExist = await User.findOne({email})
    if(emailExist){
        return res.status(400).json({message: "Email already exist"})
    }
    try {
        //If email not exist, create new user
        const user = await User.create({username, email, password, role})
        console.log(user)
        //Generate token
        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.cookie("token", token, {expiresIn:"1d"})
        res.status(201).json({message: "User created successfully", user})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body

    //check if email exist, if not return 400
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message: "User doesnt exist, please signup first"})
    }

    //check if password is correct --> current password and hashed password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({message: "Invalid Email or Password"})
    }

    //Generate token
    const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
    
    res.cookie("token", token, {expiresIn:"1d"})

    res.status(200).json({
        message: "User logged in successfully",
        user, 
    })
}


export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({message: "User logged out successfully"})
}

//Show users
export const users = async (req, res) => {
    const users = await User.find().select("-password")
    res.status(200).json(users)
}
