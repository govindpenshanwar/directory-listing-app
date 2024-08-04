import mongoose from "mongoose";
import doten from 'dotenv/config'
const uri = process.env.mongoUri

const connectDb = async () => {
    await mongoose.connect(uri).then(() => {
        console.log('db Connected')
    }).catch((e) => {
        console.log("err connecting db => ", e.message)
    })
}

export default connectDb;