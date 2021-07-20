const mongoose = require('mongoose');


// Sauce Schema
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    head: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Number, required: true },
    userDisliked: { type: Number, required: true },
})

// Export du models comme models mongoose
module.exports = mongoose('Sauces, SauceSchema'); 