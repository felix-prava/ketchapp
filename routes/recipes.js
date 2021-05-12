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
    const recipe = new Recipe({
        author: req.body.author,
        ingredients: req.body.ingredients,
        typeofFood: req.body.typeofFood,
        imageURL: req.body.imageURL,
        typeofFood: req.body.typeofFood,
        title: req.body.title,
        servings: req.body.servings,
        cookingTime: req.body.cookingTime,
        description: req.body.description
    });

    recipe.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

//Get recipes for a type of food
router.get('/searchResults', async (req, res) => {
    try {
        Recipe.find({ typeofFood: req.query.typeofFood }, function(err, recipes)
        {
            res.status(200).json(recipes);
        });
    } catch(err){
        res.status(400).json({message: "There are some problems.. " + err});
    }
});

//Get a specific recipe
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    } catch(err){
        res.status(400).json({message: "There are some problems.. " + err});
    }
});

//Delete a specific recipe
router.delete('/:id', async (req, res) => {
    try{
        const recipeDeleted = await Recipe.deleteOne({_id: req.params.id});
        res.status(200).json(recipeDeleted);
    } catch(err){
        res.json({message: err})
    }
});

//Update a specific recipe
router.patch('/:id', async (req, res) => {
});
module.exports = router;