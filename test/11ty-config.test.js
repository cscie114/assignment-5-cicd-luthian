const eleventyConfig = require('../eleventy.config.js');

test('Check input and output directories in 11ty config', () => {
  // Mock out the 11ty config object
  const config = {addPassthroughCopy: jest.fn()};
  // Call the function from eleventy.config.js
  expect(eleventyConfig(config).dir.input).toBe('src');
  expect(eleventyConfig(config).dir.output).toBe('dist');
});