import express from "express"
import dotenv from "dotenv"
import userRouter from "./router/user.routes.js"
import connectDB from "./config/database.js"
import cors from "cors"
import assignmentRouter from "./router/assignment.routes.js"
import Testpath from "./router/test.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectDB()

app.get('/', (req, res) => {
    res.send("Hello world!!");
});

app.use('/user',userRouter)
app.use('/assignment',assignmentRouter)
app.use('/Test',Testpath)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
