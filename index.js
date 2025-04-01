import express from "express"
import dotenv from "dotenv"
import userRouter from "./router/user.routes.js"
import connectDB from "./config/database.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectDB()

app.get('/', (req, res) => {
    const endpoints = [
        {
            method: "GET",
            path: "/",
            description: "Welcome message",
        },
        {
            method: "POST",
            path: "/api/register",
            description: "Register a new user",
        },
        {
            method: "POST",
            path: "/api/login",
            description: "Login a user",
        },
        {
            method: "POST",
            path: "/api/upload",
            description: "Upload a PDF or DOC file to Cloudinary",
        },
        {
            method: "GET",
            path: "/api/users",
            description: "Get all registered users",
        },
        {
            method: "GET",
            path: "/api/users/:id",
            description: "Get user details by ID",
        },
        {
            method: "PUT",
            path: "/api/users/:id",
            description: "Update user details",
        },
        {
            method: "DELETE",
            path: "/api/users/:id",
            description: "Delete a user",
        }
    ];

    res.json({ endpoints });
});

app.use('/user',userRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})