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



 const calculateTestResult = async (req, res) => {
  try {
    // 1. Extract data from request body
    const { testId, studentAnswers } = req.body;

    // 2. Validate request
    if (!testId || !studentAnswers || !Array.isArray(studentAnswers)) {
      return res
        .status(400)
        .json({ message: "Missing testId or studentAnswers array." });
    }

    // 3. Fetch the test from the DB
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    // 4. We'll check these five fields.
    const questionFields = ["question1", "question2", "question3", "question4", "question5"];
    
    let score = 0; // total correct answers
    const details = []; // per-question feedback

    // 5. Iterate over question fields
    questionFields.forEach((field, index) => {
      // Make sure the field is present and not empty
      if (test[field] && test[field].length > 0) {
        const questionData = test[field][0]; // e.g. question1[0]

        // The correct answer is in `questionData.answer` (string)
        const correctAnswer = questionData.answer; 

        // The student's submitted answer for this question
        const studentAnswer = studentAnswers[index] || ""; 

        // Compare strings
        const isCorrect = (correctAnswer === studentAnswer);
        if (isCorrect) {
          score++;
        }

        // Push feedback
        details.push({
          question: questionData.title, 
          correctAnswer,
          studentAnswer,
          isCorrect
        });
      }
    });

    // 6. Return the result
    return res.status(200).json({
      score,
      details
    });
  } catch (error) {
    console.error("Error calculating test result:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(tests);
  } catch (err) {
    console.error('Error fetching tests:', err);
    res.status(500).json({ message: 'Error fetching tests' });
  }
};

const gettestbyid = async (req, res) => {
  try {
    const {id} = req.params;
    const test = await Test.findById(id)
    if(!test){
      res.status(404).json({message:"Test Not Found!"})
    }
    res.status(200).json(test);
    }catch (error) {
      res.status(500).json({ message: 'Error fetching test' });
  }
}




export{
    createTest,
    deleteTest,
    calculateTestResult,
    getAllTests,
    gettestbyid
}