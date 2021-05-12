const { TestScheduler } = require('@jest/core');
const checkAPI = require('./checkAPI');

test(`Recipe fetched author's name should be Chef Felix`, async () => {
    expect.assertions(1);
    const recipe = await checkAPI.fetchRecipe();
    expect(recipe.author).toEqual('Chef Felix');
});

test('Dummy test', () => {
    expect(checkAPI.add(2, 2)).toBe(4);
});