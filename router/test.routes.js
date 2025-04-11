import { Router } from "express";
import { calculateTestResult, checkIfAttempted, createTest, deleteTest, getAllTests, gettestbyid } from "../controller/test.controller.js";
import protect from "../middleware/jwt.middleware.js";
import Test from "../model/test.model.js";


const Testpath=Router()

Testpath.post('/create',createTest)
Testpath.delete('/:id',deleteTest)
Testpath.post('/calculate-test',calculateTestResult)
Testpath.get('/alltest',getAllTests)
Testpath.get('/:id',gettestbyid)
export default Testpath