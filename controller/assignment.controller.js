import Assignment from "../model/assignment.model.js";

const createAssignment = async (req, res) => {
    try {
        const { title, description, deadline, link, course, instructor } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!deadline) {
            return res.status(400).json({ message: "Deadline is required" });
        }
        if (!link) {
            return res.status(400).json({ message: "Link is required" });
        }
        if (!course) {
            return res.status(400).json({ message: "Course is required" });
        }
        if (!instructor) {
            return res.status(400).json({ message: "Instructor is required" });
        }

        const newAssignment = await Assignment.create({
            title,
            description,
            deadline,
            link,
            course,
            instructor
        })
        res.status(201).json({ newAssignment });

    } catch (error) {
        console.log('Error while creating assignment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteAssignment = async (req, res) => {
    try {
        const id = req.params.id;
        const assignment = await Assignment.findByIdAndDelete(id);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment deleted successfully" });
    }
    catch (error) {

    }
}

export { createAssignment, deleteAssignment };