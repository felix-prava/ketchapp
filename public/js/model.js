export const state = {
    recipe: {},
};

export const loadRecipe = async function(recipeID) {
    try{
        const res = await fetch(
            //'http://localhost:3000/api/recipes/60899b7c63879f112092fa09'
            //'http://localhost:3000/api/recipes/608e735c7b4f6930d8a5e5fa'
            `http://localhost:3000/api/recipes/${recipeID}`
        );
        const data = await res.json();
    
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        console.log(res, data);
        let recipe = data;
        state.recipe = {
            id: recipe._id,
            title: recipe.title,
            typeofFood: recipe.typeofFood,
            publisher: recipe.author,
            image: recipe.imageURL,
            servings: recipe.servings,
            cookingTime: recipe.cookingTime,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);
    } catch(err){
        alert(err);
    }
}