const express = require("express")
const Order = require("../models/Order");
const  { protect } = require("../middleware/authmiddleware");
const { route } = require("./checkout");

const router = express.Router();

// @desc Get all the Orders for Loged in User
// @type Private

router.get("/my-orders",protect, async(req,res) =>{
    try {
        const orders = await Order.find({user : req.user._id}).sort({createdAt : -1})
        if (!orders) {
            res.status(400).json({ message: "No Orders Found" });
        }
        res.status(200).json(orders)

    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Internal server error to Featch All Orders"})
    }
})

// @desc full Order Details for Loged in User
// @type Private


router.get("/:id",protect, async(req,res) =>{
    try {
      const order = await Order.findById(req.params.id).populate("user", "name email") // will give you only name and email
      if (!order) {
        res.status(400).json({ message: "No Order Found" });
      }
      res.status(200).json(order)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Internal server error to Featch Order"})
    }
})

module.exports = router;