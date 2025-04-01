import express from "express"
import { createAssignment, deleteAssignment } from "../controller/assignment.controller.js"
const assignmentRouter = express.Router()

assignmentRouter.post('/',createAssignment)
assignmentRouter.delete('/:id',deleteAssignment)

export default assignmentRouter