const jwt = require("jsonwebtoken");
const User = require("../models/User")

// Middleware to protect Route
const protect = async (req,res,next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decode.user.id).select("-password"); // Exclude Password
            next();
        } catch (error) {
            console.error("Token Verrification Failed", error)
            res.status(401).json({message : "Not Authorized, tokem failed"})
        }
    }else{
        res.status(401).json({message : "Not Authorized, No tokem Provided"})
    }
}

// Middleware to verified as an Admin

const admin = (req,res,next) =>{
    if (req.user && req.user.role === "admin") {
        next()
    }else{
        res.status(401).json({message : "you are Not Authorized as an Admin to create the Product"})
    }
}

module.exports = {protect, admin};