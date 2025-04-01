import jwt from "jsonwebtoken"
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const register = async (req, res) => {
    try {

        const { name, email, password, course, year } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" })
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }
        if (!course) {
            return res.status(400).json({ message: "course is required" })
        }
        if (!year) {
            return res.status(400).json({ message: "year is required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password


        const user = await User.create({ name, email, password: hashedPassword, course, year })

        return res.status(201).json({user})

    } catch (error) {
        console.error('Error while registering User: ', error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }
        const token = generateToken(user._id)
        return res.status(200).json({ user, token: token })
    } catch (error) {
        console.error('Error while logging in User: ', error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}


export { register, login };