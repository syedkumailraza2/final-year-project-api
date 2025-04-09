import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  notesText: {
    type: String,
  },
  course: {
    type: String,
  },
  year: {
    type: String,
  },
  subject: {
    type: String,
  },
  images: {
    public_id: String,
    url: String,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model('Notes', NotesSchema);
export default Notes;
