import express from 'express';
const router = express.Router()

import Product from '../models/product.model.js'

router.get("/", async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})


// Add/Create a new product
router.post("/", async (req, res) => {
    //get product data from req.body
    const newProduct = new Product(req.body);
    try {
        //seve() method to save product to database
       const savedProduct = await newProduct.save();
       res.status(200).json({
        message: "Product created successfully",
        product: savedProduct
       })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Fetch single product with id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            res.status(404).json({message: "Product not found"})
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update the product with id
router.patch("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            res.status(404).json("Product not found...")
        }
        //update product with new data
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // req.params.id --> used to find that product
        //req.body --> used to update that product
        res.status(200).json({message: "Product updated successfully", product: updatedProduct})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Delete product
router.delete("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(404).json({message: "Product not found"})
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Product deleted successfully"})
})

export default router;