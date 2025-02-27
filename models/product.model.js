import mongoose from 'mongoose'

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    }, 

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },

    //user -> which user created the product
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})


const Product = mongoose.model("Product", productScheme);
export default Product;