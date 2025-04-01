import express from "express"
import { createAssignment, deleteAssignment, getAllAssignment, updateAssignment } from "../controller/assignment.controller.js"
const assignmentRouter = express.Router()

assignmentRouter.get('/', getAllAssignment)
assignmentRouter.post('/',createAssignment)
assignmentRouter.put('/:id', updateAssignment)
assignmentRouter.delete('/:id',deleteAssignment)

export default assignmentRouter