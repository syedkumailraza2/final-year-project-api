import Test from "../model/test.model.js";


const createTest = async(req,res)=>{
    try {
        const {title,date,time,duration,question1,question2,question3,question4,question5} =req.body

        if (!title || !date || !time || !duration) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }
        
        const createdTest = await Test.create({
            title,
            date,
            time,
            duration,
            question1,
            question2,
            question3,
            question4,
            question5
        })
        res.status(201).json({ createdTest });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteTest = async(req,res)=>{
    try {
        const {id}=req.params
        const test = await Test.findById(id)
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        const deletedTest = await test.deleteOne()

        res.status(200).json({deletedTest})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export{
    createTest,
    deleteTest
}