import express from 'express';
const router = express.Router()

import Product from '../models/product.model.js'

router.get("/", async (req, res) => {
    res.send("Hello, World!");
    const products = await Product.find()
    res.send(200).json(products)
})

export default router;