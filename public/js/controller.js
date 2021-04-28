
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


const showRecipe = async function (){
  try {
    const res = await fetch(
      'http://localhost:3000/api/recipes/60885bdf783cc60e24a45cbb'
    );
    const data = await res.json();

    console.log(res, data);

  } catch (err) {
    alert(err);
  }
};
showRecipe();
