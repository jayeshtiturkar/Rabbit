const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const Order = require("../models/Order");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();
// @desc CreateNew Checkout Session
// @access Private

router.post("/", protect, async (req, res) => {
  const { checkoutItmes, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItmes || checkoutItmes.length === 0) {
    return res.status(400).json({ message: "No itmes in Cart" });
  }
  try {
    // Create new checkout Seassion
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItmes: checkoutItmes,
      shippingAddress: shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal error While creating Checkout session" });
  }
});

// @desc To Update Chekout to mark as paid after sucessful payment
// @access Private
// Useless For Us.................
router.put("/pay/:id", protect, async (req, res) => {
  const { paymentStatus, paymenDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(400).json({ message: "Checkout Not Found" });
    }
    if (paymentStatus === "Paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymenDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error !!! " });
  }
});

// @desc Finalize Checkout and convert to an order after payment confirmation
// @access Private

router.post("/finalize/:id", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout Not Found" });
    }
    if (!checkout.isFinalized) {
      // Create Final Order based on the checkout details
      const finalOrder =await Order.create({
        user: checkout.user,
        orderItmes: checkout.checkoutItmes,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        isDelivered: false,
        paymentStatus: "Paid",
        paymentDetails: "Cash On Delivary",
      });

      // Mark the Checkout as Finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();

      await checkout.save();
      // Delete The Cart Associated with User
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout Already Finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not Paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Intenal Error to Finalize Checkout" });
  }
});

module.exports = router;
