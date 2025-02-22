const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    googleDriveId: { type: String, required: true },
    description: { type: String },
    uploadDate: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    thumbnailUrl: { type: String },
    duration: { type: String }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
