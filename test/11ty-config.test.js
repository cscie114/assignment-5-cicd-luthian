const eleventyConfig = require('../eleventy.config.js');

test('Check input and output directories in 11ty config', () => {
  // Mock out the 11ty config object
  const config = {addPassthroughCopy: jest.fn(), addPlugin: jest.fn(), addFilter: jest.fn()};
  // Call the function from eleventy.config.js
  const result = eleventyConfig(config)
  // Check the return values
  expect(result.dir.input).toBe('src');
  expect(result.dir.output).toBe('dist');
  // Make sure the addPassthroughCopy function was called properly
  expect(config.addPassthroughCopy.mock.calls[0][0]).toBe('src/js');
  expect(config.addPassthroughCopy.mock.calls[1][0]).toBe('src/css');
  expect(config.addPassthroughCopy).toHaveBeenCalledTimes(2);
  // Make sure the addPlugin function was called properly
  expect(config.addPlugin).toHaveBeenCalledTimes(1);
});