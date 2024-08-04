import allProducts from "../models/addProduct.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const addNewproduct = asyncHandler(async (req, res) => {
    const { product, material, grade } = req.body;
    try {
        const newProduct = new allProducts({
            product,
            material,
            grade,
        });
        await newProduct.save();
        return res.json(
            new ApiResponse(201, "New product created successfully", newProduct)
        );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export const getProductByProductIdAndMaterialId = asyncHandler(
    async (req, res) => {
        const { id, material } = req.params;
        console.log("Product ID:", id);
        console.log("Material ID:", material);

        try {
            const products = await allProducts
                .find({ product: id, material: material })
                .populate("material", "materialName")
                .populate("grade");
            return res.json(
                new ApiResponse(200, "Products fetched successfully", products)
            );
        } catch (error) {
            throw new ApiError(500, error.message);
        }
    }
);

export const updateDetailsOfProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { shape, length, thickness, surfaceFinish, outsideDia, price } =
        req.body;
    try {
        if (!id) {
            return res.json(new ApiResponse(500, "ID is missing"));
        }
        const product = await allProducts.findById({ _id: id });
        if (product) {

            product.shape = shape || product.shape;
            product.length = length || product.length;
            product.thickness = thickness || product.thickness;
            product.surfaceFinish = surfaceFinish || product.surfaceFinish;
            product.outsideDia = outsideDia || product.outsideDia;
            product.price = price || product.price;
            const updatedProduct = await product.save();

            return res.json(
                new ApiResponse(200, "Product Updated Successfully", updatedProduct)
            );
        } else {
            return res.json(new ApiResponse(404, "Product not found"));
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export const getproductCount = asyncHandler(async (req, res) => {
    try {
        const count = await allProducts.countDocuments();
        return res.json(new ApiResponse(200, "Counts fetched successfully", count))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await allProducts.find().populate('material').populate('grade');
        return res.json(new ApiResponse(200, "All Products fetched", products))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})