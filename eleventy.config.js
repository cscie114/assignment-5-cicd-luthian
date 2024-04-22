const { EleventyEdgePlugin } = require("@11ty/eleventy");

module.exports = function (config) {
  config.addPlugin(EleventyEdgePlugin);

  config.addFilter("getNasaImage", function (date) {
    return `${date} is the date`;
  });

  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/css');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
