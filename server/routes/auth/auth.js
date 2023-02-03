const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")
const User = require("../../models/User");
const fetchuser = require("../../middlewares/fetchuser");
// const JWT_SECRET = require("../../controllers/secret")

const JWT_SECRET = "owaisidrisi_123"
let success;

router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) {
            success = false;
            return res.json({ error: "Sorry a user with this email is already exists", success })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        user = await User.create({ name, email, password: secPass })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true

        res.status(200).json({ authtoken, success })

    } catch (error) {
        success = false
        res.status(400).json({ error: "Somthing went wrong", success })
        console.log(error);

    }
})


router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct email and password" })
        }
        // comparing password 
        const passwordCampare = await bcrypt.compare(password, user.password)
        if (!passwordCampare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with corrrect email and password" })
        }
        const data = {
            user: {
                id: user.id
                // email: user.email
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.status(200).json({ success, authtoken, user })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error")
    }
})

router.get("/all", async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({ user })

    } catch (error) {
        res.status(400).json({ error: "Something went wrong . cannot get all users" })
    }
})

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = (req.user.id)
        // const userId = mongoose.Types.ObjectId(req.user.id)
        const user = await User.findById(userId)

        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})


module.exports = router