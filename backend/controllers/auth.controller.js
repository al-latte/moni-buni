import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateTokenAndeSetCookie from "../utils/generateToken.js"


export const signupUser = async (req, res) => {
    try {
        const {fullname,email,password,confirmPassword} = req.body

        // check if passwords match
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"})
        }

        const user = await User.findOne({email})

        // check if email is taken
        if(user) {
            return res.status(400).json({error: "User with this email already exists"})
        }

        // Hash Password Here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            
        })

        if(newUser) {
            generateTokenAndeSetCookie(newUser._id, res)
            await newUser.save()

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email
        })
        } else {
           return res.status(400).json({error: "Invalid user data"})
        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({error: "Internal server error"})
        
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndeSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        })
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({error: "Internal server error"})
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({error: "Internal server error"})
    }
}

