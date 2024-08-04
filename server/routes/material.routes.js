import { Router } from "express";
import { addMaterialName, getMaterialsByProductId } from "../controllers/material.controller.js";

const materialRouter = Router();

materialRouter.post("/add-material", addMaterialName)
materialRouter.get("/get-materials/:id", getMaterialsByProductId)


export default materialRouter;