let mongoose = require('mongoose');

// Recipe Schema
let RecipeSchema = mongoose.Schema({
    typeofFood :{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);