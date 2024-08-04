import products from "../models/prodct.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const addProductName = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        const newName = new products({
            productName: name
        })
        await newName.save();
        return res.json(new ApiResponse(200, "Product Created Successfully", newName))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const allProducts = await products.find();
        return res.json(new ApiResponse(200, "Products fetched successfully", allProducts))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})