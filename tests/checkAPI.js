const axios = require('axios');

const checkAPI = {
  add: (num1, num2) => num1 + num2,
  fetchRecipe: () =>
    axios
      .get('http://localhost:3000/api/recipes/609c4f7b161cb33b6874a55b')
      .then(res => res.data)
      .catch(err => 'error'),
  fetchWrongRecipe: () =>
    axios
      .get('http://localhost:3000/api/recipes/609c4f7b161cb33b4564566874a55b')
      .then(res => res.data)
      .catch(err => 'CastError: Cast to ObjectId failed for value \"609c4f7b161cb33b4564566874a55b\" at path \"_id\" for model \"Recipe\"'),
  fetchUser: () =>
    axios
      .get('http://localhost:3000/api/users/609c4c4e161cb33b6874a55a')
      .then(res => res.data)
      .catch(err => 'error'),
  fetchWrongUser: () =>
    axios
      .get('http://localhost:3000/api/users/609c4c4e161cb33b6874a55aa')
      .then(res => res.data)
      .catch(err => 'error')
};

module.exports = checkAPI;