let mongoose = require('mongoose');

// Recipe Schema
let RecipeSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);