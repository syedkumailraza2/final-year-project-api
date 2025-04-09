import express from "express";
import { createNote, getNotes, updateNote, deleteNote,  getNoteById  } from "../controller/notes.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/upload', upload.single('notesFile'), createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', upload.single('notesFile'), updateNote);
router.delete('/:id', deleteNote);

export default router;