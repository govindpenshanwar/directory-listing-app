import { Router } from "express";
import { addGrades, getGradesByMaterialId } from "../controllers/grades.controller.js";

const gradeRouter = Router();

gradeRouter.post("/add-grade", addGrades)
gradeRouter.get("/get-grades/:id", getGradesByMaterialId)


export default gradeRouter