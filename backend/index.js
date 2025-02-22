const express = require('express');
const cors = require('cors');
const mongoose = require('./db'); // Ensures DB connection is initialized
const userRoutes = require("./routes/users");
const videoRoutes = require("./routes/videos"); // Importing video routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/api/videos", videoRoutes); // Mount videos API route

// Basic route check
app.get("/", (req, res) => {
    res.send("Welcome to the Sign Language API!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
