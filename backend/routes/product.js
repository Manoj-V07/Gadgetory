const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

router.get('/' , async (req,res) => {
    try {
        const products = await Product.find()
        // Normalize the response to ensure 'title' field exists
        const normalizedProducts = products.map(product => {
            const productObj = product.toObject()
            // If 'name' exists but 'title' doesn't, use 'name' as 'title'
            if (productObj.name && !productObj.title) {
                productObj.title = productObj.name
            }
            return productObj
        })
        res.status(200).json(normalizedProducts)
    }
    catch (error) {
        res.status(500).json({ message : 'Error fetching product' , error})
    }
})


router.get('/:id' , async (req,res) => {
    try {
        const product = await Product.findOne({ id : req.params.id})
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Normalize the response to ensure 'title' field exists
        const productObj = product.toObject()
        if (productObj.name && !productObj.title) {
            productObj.title = productObj.name
        }
        res.status(200).json({ message : 'Product fetched successfully' , product: productObj})
    } catch (error) {
        res.status(500).json({ message : 'Error fetching product' , error})
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const product = await Product.findOneAndDelete({ id : req.params.id})
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json({ message : 'Product deleted sucessfully'})
        }
    } catch (error) {
        res.status(500).json({ message : 'Error deleting product' , error})
    }
})

router.post('/' , async (req,res) => {
    try {
        const { id , title , description , image , originalPrice , discountedPrice , rating } = req.body
        const newProduct = await Product.create({ id : id.toString(), title , description , image , originalPrice , discountedPrice , rating })
        res.status(201).json({ message : "Product added successfully" , newProduct})
    } catch (error) {
        res.status(500).json({ message : 'Error adding product' , error})
    }
})


module.exports = router