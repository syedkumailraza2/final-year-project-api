import Lecture from "../model/lecture.model.js";

const createLecture = async (req, res) => {
    try {
        const { title, date, instructor } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }
        if (!instructor) {
            return res.status(400).json({ message: "Instructor is required" });
        }

        const newLecture = new Lecture({ title, date, instructor });
        await newLecture.save();

        return res.status(201).json({ lecture: newLecture });

    } catch (error) {
        console.log('Error while creating lecture:', error)
        return res.status(500).json({ message: 'Internal Server Error' })

    }
}

const updateLecture = async (req, res) => {
    try {
        const id = req.params.id;
        const existLecture = await Lecture.findById(id);
        if (!existLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        const updatedLec = await Lecture.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // Returns updated document
        );
        return res.status(200).json({ lecture: updatedLec });

    } catch (error) {
        console.log('Error while updating lecture:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find();
        return res.status(200).json({ lectures: lectures });
    } catch (error) {
        console.log('Error while Getting lecture:',error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteLecture = async (req, res) => {
    try {
        const id = req.params.id;
        const existLecture = await Lecture.findById(id);
        if (!existLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        await Lecture.findByIdAndDelete(id);
        return res.status(200).json({ message: "Lecture deleted" });

    } catch (error) {
        console.log('Error while Deleting lecture:',error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export { createLecture, updateLecture, getLectures, deleteLecture };