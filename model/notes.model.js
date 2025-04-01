import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    filePath: {
        type: String,
        required: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Notes = mongoose.model('Notes', NotesSchema);
export default Notes;