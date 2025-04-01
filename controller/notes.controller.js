import Notes from "../model/notes.model.js";
import fs from "fs";

// Upload Note (supports PDF, audio, video)
const uploadNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            if (req.file) fs.unlinkSync(req.file.path);  // Delete uploaded file if title is missing
            return res.status(400).json({ message: "Title is required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        const filePath = req.file.path.replace(/\\/g, "/");
        const note = new Notes({ 
            title, 
            description, 
            filePath,
            fileType: req.fileType,  // From multer middleware
        });

        await note.save();
        res.status(201).json({ message: "Note uploaded successfully", note });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);  // Cleanup on error
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Notes
const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Single Note by ID
const getNoteById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Search Notes by Title
const searchNotes = async (req, res) => {
    try {
        const query = req.query.q;
        const notes = await Notes.find({
            title: { $regex: query, $options: "i" },
        });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Note (title/description only)
const updateNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Note (with file cleanup)
const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Delete the file from server
        fs.unlinkSync(note.filePath);

        // Delete from DB
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note and file deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export { uploadNote, getNotes, getNoteById, searchNotes, updateNote, deleteNote };