const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/User");

router.get("/", authController.guest ,(req,res) => {
    res.render("login", {
        layout: "login"
    })
})
router.get("/dashboard", authController.protect, async (req,res) => {
    let user = await User.findOne({ _id: req.user.id });
    res.render("Dashboard", {
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image
    })
})

module.exports = router;