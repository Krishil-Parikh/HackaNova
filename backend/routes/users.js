require('dotenv').config();
const express = require('express');
const User = require('../models/User'); // Import User model correctly
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const router = express.Router();

// Validation schemas using Zod
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

// Signup Route
router.post("/signup", async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Incorrect input(s)" });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).json({ message: "Email already taken" });
    }

    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            message: "User Created Successfully",
            token,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Signin Route
router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.json({ token });
    }

    res.status(401).json({ message: "Invalid username or password" });
});

// Update User Info Route (Requires Auth)
router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Invalid update fields" });
    }

    try {
        await User.updateOne({ _id: req.userId }, { $set: req.body });
        res.json({ message: "Updated Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
