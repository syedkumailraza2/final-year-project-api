import { Router } from "express";
import { createTest, deleteTest } from "../controller/test.controller.js";
import protect from "../middleware/jwt.middleware.js";
import Test from "../model/test.model.js";


const Testpath=Router()

Testpath.post('/create',createTest)
Testpath.delete('/:id',deleteTest)
export default Testpath