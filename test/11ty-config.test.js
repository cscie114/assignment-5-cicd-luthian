const eleventyConfig = require('../eleventy.config.js');

test('Check input and output directories in 11ty config', () => {
  // Mock out the 11ty config object
  const config = {addPassthroughCopy: jest.fn()};
  // Call the function from eleventy.config.js
  const result = eleventyConfig(config)
  // Check the return values
  expect(result.dir.input).toBe('src');
  expect(result.dir.output).toBe('dist');

  expect(config.addPassthroughCopy).toHaveBeenCalledTimes(2);
});