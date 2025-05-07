const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authmiddleware");
const router = express.Router();

// get All User
// @access Private/Admin
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Error to get All Users" });
  }
});

// to Create new Admin or Customer
router.post("/create-user", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({ message: "User Already Exist." });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "customer",
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Error to Create New Users" });
  }
});

// to Update new Admin or Customer
router.put("/user/:id", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Exist." });
    }
    user.name = name || user.name
    user.email = email || user.email
    user.password = password || user.password
    user.role = role || user.role

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Error to Update Users" });
  }
});

// to Create new Admin or Customer
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found !!!" });
    }
    return res
      .status(200)
      .json({ message: "User Deleted Sucessfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Error to Delete Users" });
  }
});

module.exports = router;
