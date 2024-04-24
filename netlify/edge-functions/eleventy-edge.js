import { EleventyEdge, precompiledAppData } from './_generated/eleventy-edge-app.js';
import { fetch } from 'node-fetch';
import '../../src/env.js';

export default async (request, context) => {
  try {
  // Get Mars Curiousity Rover image info for this day in 2021 ans save in global data
  // Since the rover stopped sending images, we will use the date to get the image

  const year2021 = new Date();
  year2021.setFullYear(2021);
  const today = year2021.toISOString().split('T')[0]; // YYYY-MM-DD;

  const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
  const params = new URLSearchParams({ earth_date: today, camera: 'FHAZ', api_key: process.env.NASA_API_KEY });
  console.log('url', url, 'params', params.toString());

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
    console.log('data', data);

    const onePhoto = data.photos[0];
    // const onePhoto = {"id":827390,"sol":3095,"camera":{"id":20,"name":"FHAZ","rover_id":5,"full_name":"Front Hazard Avoidance Camera"},"img_src":"https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/03095/opgs/edr/fcam/FLB_672268425EDR_F0872578FHAZ00337M_.JPG","earth_date":"2021-04-21","rover":{"id":5,"name":"Curiosity","landing_date":"2012-08-06","launch_date":"2011-11-26","status":"active","max_sol":4102,"max_date":"2024-02-19","total_photos":695670,"cameras":[{"name":"FHAZ","full_name":"Front Hazard Avoidance Camera"},{"name":"NAVCAM","full_name":"Navigation Camera"},{"name":"MAST","full_name":"Mast Camera"},{"name":"CHEMCAM","full_name":"Chemistry and Camera Complex"},{"name":"MAHLI","full_name":"Mars Hand Lens Imager"},{"name":"MARDI","full_name":"Mars Descent Imager"},{"name":"RHAZ","full_name":"Rear Hazard Avoidance Camera"}]}};

    let edge = new EleventyEdge('edge', {
      request,
      context,
      precompiled: precompiledAppData,
      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config(eleventyConfig => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addFilter('json', obj => JSON.stringify(obj, null, 2));
      // Make geo data available globally
      eleventyConfig.addGlobalData('geo', context.geo);
      eleventyConfig.addGlobalData('photo', onePhoto);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log('ERROR', { e });
    return context.next(e);
  }
};
