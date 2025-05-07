const express = require("express")
const router = express.Router()
const Subscribe = require("../models/Subscribe")

router.post("/",async (req,res) => {
    const { email } = req.body
    if (!email) {
        res.status(400).json({message : "Email is Required"})
    }
    try {
        let subscriber = await Subscribe.findOne({email : email})
        if(subscriber) {
            return res.status(400).json({message : "Email is Already subscribe"})
            // Always Use Return as you Sending Final Response ~@@** Else Its Moves to Next Line or Function
        }
        const newSubscriber = await Subscribe.create({email})
        res.status(201).json({message : "Sucessfully Subscribe to Newsletters",newSubscriber})

    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Internal Server to Subscribe"})
    }
})

module.exports = router;