import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    instructor:{ type: String, required: true },
})

const Lecture = mongoose.model('Lecture', lectureSchema);
export default Lecture;