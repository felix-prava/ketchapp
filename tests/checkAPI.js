const axios = require('axios');

const checkAPI = {
  add: (num1, num2) => num1 + num2,
  fetchRecipe: () =>
    axios
      .get('http://localhost:3000/api/recipes/609c4f7b161cb33b6874a55b')
      .then(res => res.data)
      .catch(err => 'error')
};

module.exports = checkAPI;