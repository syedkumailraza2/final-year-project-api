import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
    uploadNote,
    getNotes,
    getNoteById,
    searchNotes,
    updateNote,
    deleteNote
} from "../controller/notes.controller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadNote);  // Upload Note
router.get("/", getNotes);  // Get All Notes
router.get("/:id", getNoteById);  // Get Single Note
router.get("/search", searchNotes);  // Search Notes
router.put("/:id", updateNote);  // Update Note
router.delete("/:id", deleteNote);  // Delete Note

export default router;
