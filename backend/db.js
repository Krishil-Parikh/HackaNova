const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://manav25gohil:NBOFnjuXZ8XWPVHw@cluster0.7du3n.mongodb.net/sign_language')
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.error('Mongodb connection error: ', err))

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})


const User = mongoose.model("User", userSchema)

module.exports = {
    User
}