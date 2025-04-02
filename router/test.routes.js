import { Router } from "express";
import { createTest, deleteTest } from "../controller/test.controller.js";
import protect from "../middleware/jwt.middleware.js";
import Test from "../model/test.model.js";


const Testpath=Router()

Testpath.post('/',protect,createTest)
Testpath.delete('/:id',protect,deleteTest)
export default Testpath