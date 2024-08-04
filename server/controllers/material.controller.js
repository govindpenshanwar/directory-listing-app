import materials from "../models/material.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const addMaterialName = asyncHandler(async (req, res) => {
    const { name, product } = req.body;
    try {
        const newMaterial = new materials({
            materialName: name,
            product
        })
        await newMaterial.save();
        return res.json(new ApiResponse(200, "Material Created Successfully", newMaterial))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export const getMaterialsByProductId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const allMaterials = await materials.find({ product: id }).populate('product')
        return res.json(new ApiResponse(200, "Material fetched successfully", allMaterials))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})