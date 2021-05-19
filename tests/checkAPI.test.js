const { TestScheduler } = require('@jest/core');
const { sendJSON } = require('../public/js/helpers.js')
const checkAPI = require('./checkAPI');

test(`Recipe fetched author's name should be Chef Felix`, async () => {
    expect.assertions(1);
    const recipe = await checkAPI.fetchRecipe();
    expect(recipe.author).toEqual('Chef Felix');
});

test(`Test the error message when looking for a recipe with an invalid id`, async () => {
    expect.assertions(1);
    const error = await checkAPI.fetchWrongRecipe();
    expect(error).toEqual('CastError: Cast to ObjectId failed for value \"609c4f7b161cb33b4564566874a55b\" at path \"_id\" for model \"Recipe\"');
});

test(`Check if the fetched user is the correct one`, async () => {
    expect.assertions(3);
    const user = await checkAPI.fetchUser();
    expect(user.name).toEqual('Pravă Felix-Mihai');
    expect(user.username).toEqual('felix24mihai');
    expect(user.password).toEqual('$2a$10$EUv1cNNGtFUErJDZG1R3.etx3veI74TVidI3E5gpfOBTva3.AyICa');
});

test(`Test the error message when looking for a user with an invalid id`, async () => {
    expect.assertions(1);
    const error = await checkAPI.fetchWrongUser();
    expect(error).toEqual({"message": "There are some problems.. CastError: Cast to ObjectId failed for value \"609c4c4e161cb33b6874a55aa\" at path \"_id\" for model \"User\""});
});

test(`Should post a new recipe`, async () => {
    uploadData = {
        "author": "Chef Mauriel",
        "ingredients": [
            {
                    "_id": "608e735c7b4f6930d8a5e5fb",
                    "quantity": "0.5",
                    "unit": "kg",
                    "description": "chicken breast"
                },
                {
                    "_id": "608e735c7b4f6930d8a5e5fc",
                    "quantity": "1",
                    "unit": "tablespoon",
                    "description": "fresh chives chopped"
                },
                {
                    "_id": "608e735c7b4f6930d8a5e5fd",
                    "quantity": "2",
                    "unit": "tablespoons",
                    "description": "fresh oregano chopped"
                },
                {
                    "_id": "608e735c7b4f6930d8a5e5fe",
                    "quantity": "2",
                    "unit": "tablespoons",
                    "description": "mayo"
                },
                {
                    "_id": "608e735c7b4f6930d8a5e5ff",
                    "quantity": "",
                    "unit": "",
                    "description": "salt & pepper to taste"
                }
        ],
        "typeofFood": "Pizza",
        "imageURL": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1914&q=80",
        "title": "Pizza Gustosso",
        "description": "Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved. After 5 minutes stir if the yeast hasn't dissolved completely. The yeast should begin to foam or bloom, indicating that the yeast is still active and alive. Add the flour, salt, sugar, and olive oil, and using the mixing paddle attachment, mix on low speed for a minute. Then replace the mixing paddle with the dough hook attachment. Knead the pizza dough on low to medium speed using the dough hook about 7-10 minutes. If you don't have a mixer, you can mix the ingredients together and knead them by hand.",
        "servings": 1,
        "cookingTime": "55"
    }
    expect.assertions(1);
    const recipe = await sendJSON('http://localhost:3000/api/recipes', uploadData);
    expect(recipe.author).toEqual('Chef Mauriel');
});

test('Dummy test', () => {
    expect(checkAPI.add(2, 2)).toBe(4);
});