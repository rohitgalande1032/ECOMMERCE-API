import express from 'express';
const router = express.Router()
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';


router.get("/", getProducts)

// Add/Create a new product
router.post("/", addProduct)

//Fetch single product with id
router.get("/:id", getProductById)

//update the product with id
router.patch("/:id", updateProduct)


//Delete product
router.delete("/:id", deleteProduct)

export default router;