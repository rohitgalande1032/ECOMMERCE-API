import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config.js";
import  authRoutes  from "./routes/auth.routes.js";

const app = express()

app.get("/", (req, res) => {
    res.send("<h1>E-commerce store</h1>")
})

app.use(express.json())
app.use("/api/auth", authRoutes)

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
