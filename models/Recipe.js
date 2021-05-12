let mongoose = require('mongoose');

const incredientSchema = mongoose.Schema({
    quantity: {
        type: String
    },
    unit: {
        type: String
    },
    description: {
        type: String
    }
});

// Recipe Schema
let RecipeSchema = mongoose.Schema({
    author :{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    ingredients: [incredientSchema],
    typeofFood :{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    imageURL :{
        type: String
    },
    title :{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    servings :{
        type: Number,
        required: true
    },
    cookingTime :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);