import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    materialName: {
        type: String,
        required: [true, "material name is required"],
        unique: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }
}, { timestamps: true })

const materials = mongoose.model('materials', materialSchema)
export default materials;