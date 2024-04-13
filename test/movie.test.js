const getMovie = require('../src/_data/movie.js');
const axios = require('axios').default;

  // Mock out the axios module
jest.mock('axios');

test('Check fetch of movie data', async () => {

  const movieData = { title: 'A movie', year: 2024, director: 'A director' };
  const resp = { data: movieData };
  axios.get.mockResolvedValue(resp);

  const returnedData = await getMovie();

  expect(returnedData).toEqual(movieData);
  expect(axios.get).toHaveBeenCalledTimes(1);
});
