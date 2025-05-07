const express = require("express")
const Order = require("../models/Order")
const { protect,admin} = require("../middleware/authmiddleware")

const router = express.Router();

// get all the Orders for Admin Only
// @access Private/admin
router.get("/",protect,admin,async (req,res) => {
    try {
        const orders = await Order.find({}).populate("user","name email")
        res.status(200).json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Internal Error to Admin Orders"})
    }
})

// get all the Orders for Admin Only
// @access Private/admi
router.put("/:id",protect,admin,async (req,res) => {
    const { status } = req.body
    try {
        const order =await Order.findById(req.params.id).populate("user","name email")
        if (!order) {
            return res.status(404).json({message : "Order Not Found !!!"})
        }
        if (order.isDelivered) {
            return res.status(404).json({message : "Order Delivered Already !!!"})
        }
        order.status = status
        order.isDelivered = status === "Delivered" ? true : order.isDelivered
        order.deliveredAt = status === "Delivered" ? Date.now() : order.deliveredAt
        await order.save()
        res.status(200).json(order)

    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Internal Error to Update Orders"})
    }
})

module.exports = router;