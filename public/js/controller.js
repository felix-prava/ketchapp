
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


const showRecipe = async function (){
  try {

    //Loading recipe
    const res = await fetch(
      'http://localhost:3000/api/recipes/60899b7c63879f112092fa09'
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)
    console.log(res, data);
    let recipe = data;
    recipe = {
      id: recipe._id,
      title: recipe.title,
      typeofFood: recipe.typeofFood,
      publisher: recipe.author,
      image: recipe.imageURL,
      servings: recipe.servings,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients
    }
    console.log(recipe);

  } catch (err) {
    alert(err);
  }
};
showRecipe();
