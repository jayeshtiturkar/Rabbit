const express = require("express")
const Product = require("../models/Products")
const {protect,admin } = require("../middleware/authmiddleware")

const router = express.Router();

// get all the Products for Admin Only
// @access Private/admin
router.get("/",protect,admin,async (req,res) => {
    try {
       const products = await Product.find({})
       res.status(200).json(products)
       
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Internal server Error"})
    }
})

module.exports = router;