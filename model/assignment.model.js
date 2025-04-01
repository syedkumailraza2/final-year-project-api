import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    link: String,
    course: String,
    instructor: String
},{timestamps:true})

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;