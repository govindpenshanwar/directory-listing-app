import { Router } from 'express'
import { addNewproduct, fetchAllProducts, getProductByProductIdAndMaterialId, getproductCount, updateDetailsOfProduct } from '../controllers/newProduct.controller.js';

const newProductRouter = Router();
newProductRouter.post("/add-new-product", addNewproduct)
newProductRouter.get("/get-products/:id/:material", getProductByProductIdAndMaterialId);
newProductRouter.put("/update-product/:id", updateDetailsOfProduct)
newProductRouter.get("/count", getproductCount)
newProductRouter.get("/allProducts", fetchAllProducts)

export default newProductRouter