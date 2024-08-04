import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        material: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "materials",
        },
        grade: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "grades",
            },
        ],
        shape: String,
        length: String,
        thickness: String,
        surfaceFinish: String,
        outsideDia: String,
        price: String,
    },
    { timestamps: true }
);

const allProducts = mongoose.model("allProducts", productSchema);

export default allProducts;
