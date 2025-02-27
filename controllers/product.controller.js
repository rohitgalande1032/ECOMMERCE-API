import express from "express";
const router = express.Router();
import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
}

export const addProduct = async (req, res) => {
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
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            res.status(404).json({message: "Product not found"})
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProduct = async (req, res) => {
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
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(404).json({message: "Product not found"})
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Product deleted successfully"})
}

