import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config.js";
import  authRoutes  from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from 'cookie-parser';
const app = express()

app.get("/", (req, res) => {
    res.send("<h1>E-commerce store</h1>")
})

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

//Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Connected to database!!!!")
}).catch((err) => {
    console.log("Database connection error: ", err)
})

app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
