import { Router } from "express";
import { addProductName, fetchAllProducts } from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post("/add-product", addProductName)
productRouter.get("/all-products", fetchAllProducts)

export default productRouter