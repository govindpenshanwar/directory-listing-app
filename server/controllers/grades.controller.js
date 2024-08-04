import grades from "../models/grades.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const addGrades = asyncHandler(async (req, res) => {
    const { name, material } = req.body;
    try {
        const newName = new grades({
            name,
            material
        });
        await newName.save();
        return res.json(new ApiResponse(200, "Grade Added Successfully", newName))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export const getGradesByMaterialId = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const allGrades = await grades.find({ material: id }).populate('material')
        return res.json(new ApiResponse(200, "Grades Fetched Successfully", allGrades))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})