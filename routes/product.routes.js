import express from 'express';
const router = express.Router()
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

router.get("/", getProducts)

// Add/Create a new product
router.post("/", authenticateUser, addProduct)

//Fetch single product with id
router.get("/:id", getProductById)

//update the product with id
router.patch("/:id", authenticateUser, updateProduct)

//Delete product
router.delete("/:id", authenticateUser, deleteProduct)

export default router;