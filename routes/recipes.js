const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

//Get all the recipes
router.get('/', async (req, res) => {
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch{
        res.status(420).json({message: err})
    }
});

//Add a recipe
router.post('/', (req, res) => {
});

//Get a specific recipe
router.get('/:id', async (req, res) => {
});

//Delete a specific recipe
router.delete('/:id', async (req, res) => {

});

//Update a specific recipe
router.patch('/:id', async (req, res) => {

});


module.exports = router;