const mongoose = require('mongoose');


// Sauce Schema
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, maxlength: [15, 'Nombre de caractéres limité a 15'] },
    manufacturer: { type: String, required: true, maxlength: [30, 'Nombre de caractéres limité a 30'] },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true, maxlength: [15, 'Nombre de caractéres limité a 15'] },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
  });

// Export du models comme models mongoose
module.exports = mongoose.model('Sauces', sauceSchema); 