const { EleventyEdgePlugin, EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (config) {
  config.addPlugin(EleventyEdgePlugin);
	config.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "nasa", // The serverless function name from your permalink object
		functionsDir: "./netlify/functions/",
    redirects: "netlify-toml",
	});

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
