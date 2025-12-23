const User = require('../models/User')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const registerUser = async (req  , res) => {
    try {
        const { email , password , role } = req.body
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return  res.status(400).json({ message : "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const newUser = await User.create({
            email , 
            password : hashedPassword , 
            role: role || 'user'
        })
        if(newUser){
            const token = jsonwebtoken.sign(
                { id : newUser._id , email : newUser.email , role : newUser.role },
                process.env.SECRET_KEY || 'your-secret-key', 
                { expiresIn : '7d' }
            )
            return res.status(201).json({ 
                message : "User created successfully" , 
                user : { id: newUser._id, email: newUser.email, role: newUser.role },
                token
            })
        } else {
            return res.status(400).json({ message : "Unable to create User"})
        }
    } catch(err) {
        return res.status(500).json({ message : "Error creating user" , error : err.message})
    }
}

const loginUser = async(req,res) => {
    try {
        const { email , password } = req.body
        const existingUser = await User.findOne({ email })
        if(!existingUser) {
            return res.status(401).json({ message : "User not found"})
        }
        const isCorrectPassword = await bcrypt.compare(password , existingUser.password)
        if(!isCorrectPassword) {
            return res.status(401).json({ message : "Invalid email or password"})
        } 
        
        const token = jsonwebtoken.sign(
            { id : existingUser._id , email : existingUser.email , role : existingUser.role },
            process.env.SECRET_KEY || 'your-secret-key', 
            { expiresIn : '7d' }
        )
        
        return res.status(200).json({ 
            message : "User logged in successfully" , 
            user : { id: existingUser._id, email: existingUser.email, role: existingUser.role },
            token
        })

    } catch(err) {
        return res.status(500).json({ message : "Error logging in" , error : err.message})
    }
}

module.exports = { loginUser , registerUser }