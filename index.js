import express from "express"
import dotenv from "dotenv"
import userRouter from "./router/user.routes.js"
import connectDB from "./config/database.js"
import cors from "cors"
import assignmentRouter from "./router/assignment.routes.js"
import Testpath from "./router/test.routes.js"
import notesRoutes from "./router/notes.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import lectureRouter from "./router/lecture.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "https://final-year-project-chi-six.vercel.app",
  }));


// Static files configuration
const uploadsDir = path.join(__dirname, "public", "uploads");
app.use("/uploads", express.static(uploadsDir, {
    // Handle missing files gracefully
    fallthrough: false,
}));

// Error handler for static files
app.use("/uploads", (err, req, res, next) => {
    if (err.status === 404) {
        return res.status(404).json({ error: "File not found" });
    }
    next(err);
});


connectDB()

app.get('/', (req, res) => {
    res.send("Hello world!!");
});

app.use('/user',userRouter)
app.use('/assignment',assignmentRouter)
app.use('/Test',Testpath)
app.use("/notes", notesRoutes);
app.use('/lectures',lectureRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
