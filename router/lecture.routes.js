import express from "express"
import { createLecture, deleteLecture, getLectures, updateLecture } from "../controller/lecture.controller.js"
const lectureRouter = express.Router()

lectureRouter.get('/', getLectures)
lectureRouter.post('/',createLecture)
lectureRouter.put('/:id', updateLecture)
lectureRouter.delete('/:id',deleteLecture)

export default lectureRouter