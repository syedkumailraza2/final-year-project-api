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
        return res.status(201).json({ newAssignment });

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
        return res.status(200).json({ message: "Assignment deleted successfully" });
    }
    catch (error) {

    }
}

const updateAssignment = async (req, res) => {
    try {
        const id = req.params.id;
        const existingAssignment = await Assignment.findById(id);

        if (!existingAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        const updatedAsmt = await Assignment.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // Returns updated document
        );

        return res.status(200).json({ updatedAsmt });

    } catch (error) {
        console.log('Error while updating assignment:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllAssignment = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        return res.status(200).json(assignments);
    } catch (error) {
        console.log('Error while Getting All assignments:', error);
        return res.status(200).json({ message: "Internal Server Error" });
    }
}

export { createAssignment, deleteAssignment, updateAssignment, getAllAssignment };