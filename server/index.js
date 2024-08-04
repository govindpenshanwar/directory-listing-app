import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors';
import productRouter from './routes/products.routes.js';
import materialRouter from './routes/material.routes.js';
import gradeRouter from './routes/grades.routes.js';
import connectDb from './DbConfig/config.js';
import newProductRouter from './routes/newProduct.routes.js';
import ApiError from './utils/ApiError.js';
import ApiResponse from './utils/ApiResponse.js';
const app = express();
const port = process.env.PORT || 3001

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json())
app.use("/api", productRouter)
app.use("/api", materialRouter)
app.use("/api/grade", gradeRouter)
app.use("/api/product", newProductRouter)
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "server is up and running"
    })
})

app.use((err, req, res, next) => {
    if (err) {
        throw new ApiError(err.statusCode || 500, err.message || "something went wrong", err)
    }
    next();
})

app.all("*", (req, res) => {
    return res.json(new ApiResponse(500, `can't find ${req.method} ${req.originalUrl} on this server`))
})

connectDb();
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
