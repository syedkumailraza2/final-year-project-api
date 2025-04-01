import { Router } from "express";
import { createTest } from "../controller/test.controller.js";
import protect from "../middleware/jwt.middleware.js";


const Testpath=Router()

Testpath.post('/',protect,createTest)

export default Testpath