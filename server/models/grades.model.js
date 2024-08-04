import mongoose from "mongoose";

const gradesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Grade name is required"],
        unique: true
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'materials'
    }
}, { timestamps: true })


const grades = mongoose.model('grades', gradesSchema)

export default grades;