const express = require('express');
const router = express.Router();
const Video = require('../models/Video'); // Import Video Model

// GET all videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ uploadDate: -1 });
        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET single video by ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.json(video);
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
