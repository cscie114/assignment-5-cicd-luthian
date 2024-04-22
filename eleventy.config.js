const { EleventyEdgePlugin, EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (config) {
  config.addPlugin(EleventyEdgePlugin);
	config.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "nasa", // The serverless function name from your permalink object
		functionsDir: "./netlify/functions/",
    redirects: "netlify-toml",
	});

  config.addFilter("getNasaImage", async function (eleventy) {
  // Get Mars Curiousity Rover image info for this day in 2021 ans save in global data
  // Since the rover stopped sending images, we will use the date to get the image

  const year2021 = new Date();
  year2021.setFullYear(2021);
  const today = year2021.toISOString().split('T')[0]; // YYYY-MM-DD;

  const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
  const params = new URLSearchParams({ earth_date: today, camera: 'FHAZ', api_key: process.env.NASA_API_KEY });
  // console.log('url', url, 'params', params.toString());

  try {
    const response = await fetch(`${url}/?${params.toString()}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    // console.log('data', data);

    const onePhoto = data.photos[0];
    return onePhoto;
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
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
