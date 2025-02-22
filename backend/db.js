const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://manav25gohil:NBOFnjuXZ8XWPVHw@cluster0.7du3n.mongodb.net/sign_language';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB ✅"))
    .catch((err) => console.error("MongoDB connection error ❌:", err));

// Handle DB connection errors
mongoose.connection.on("error", err => {
    console.error("MongoDB connection error ❌:", err);
});

module.exports = mongoose;
