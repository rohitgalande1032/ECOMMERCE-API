import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    }, 

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator:validator.isEmail,
            message: "Please enter a valid email",
        }
    }, 

    password: {
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {timestamps:true})

userSchema.pre("save", async function(next) {
    //validation for password
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(this.password, salt)
    this.password = password

    next()
})

//this is to save this schema as name "User" in the database
const User = mongoose.model("User", userSchema)

//this is to export the User model
export default User;