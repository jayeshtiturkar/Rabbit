const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authmiddleware")

const router = express.Router();

// @desc Register a New User
// @access Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Register Logic
        let user = await User.findOne({ email });

        if (user) res.status(400).json({ message: "User Already Exist." });

        user = User({ name, email, password });
        await user.save();

        // Payload For JWT
        const payolad = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data

        jwt.sign(
            payolad,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err; // Insted of Sending res.json({}) you are using throw

                // IF there is no err then send response to user
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @desc Login a Existing User
// @access Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // check the user does exist in db or not 
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials." });

        // check the password matches with our pass
        const isMatch = await user.matchPassword(String(password));
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

         // Payload For JWT
         const payolad = { user: { id: user._id, role: user.role } };

        // IF user id and password both are valid
        jwt.sign(
            payolad,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err; // Insted of Sending res.json({}) you are using throw

                // IF there is no err then send response to user
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        )

    } catch (error) { 
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @desc Get User Profile
// @access Private
router.get("/profile",protect, async(req,res) => {
    res.json(req.user)
})


module.exports = router;
