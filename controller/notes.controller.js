import Note from "../model/notes.model.js";
import { v2 as cloudinary } from "cloudinary";

// Create Note
const createNote = async (req, res) => {
    try {
        const { title, description, notesText, course, year, subject } = req.body;
        
        const newNote = new Note({
            title,
            description,
            notesText,
            course,
            year,
            subject
        });

        if(req.file) {
            newNote.images = {
                public_id: req.file.public_id,
                url: req.file.path
            }
        }

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Note
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: 'Note not found' });

        if(req.file && note.images.public_id) {
            await cloudinary.uploader.destroy(note.images.public_id);
        }

        const updateData = {
            ...req.body,
            ...(req.file && {
                images: {
                    public_id: req.file.public_id,
                    url: req.file.path
                }
            })
        };

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
      const note = await Note.findById(req.params.id);
      if(!note) return res.status(404).json({ message: 'Note not found' });

      if(note.images.public_id) {
          await cloudinary.uploader.destroy(note.images.public_id);
      }

      await note.deleteOne(); // Updated method
      
      res.json({ message: 'Note deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export { createNote, getNotes, updateNote, deleteNote };