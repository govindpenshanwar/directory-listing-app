import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is requuired"]
    }
}, { timestamps: true })

const products = mongoose.model('products', productSchema);

export default products;