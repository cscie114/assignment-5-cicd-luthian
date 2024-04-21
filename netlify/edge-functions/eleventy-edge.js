import '../../src/env.js';
import axios from 'axios';
import { EleventyEdge, precompiledAppData } from './_generated/eleventy-edge-app.js';

export default async (request, context) => {
  try {
    // Get Mars Curiousity Rover image info for this day in 2021 ans save in global data
    // Since the rover stopped sending images, we will use the date to get the image

    const year2021 = new Date()
    year2021.setFullYear(2021);
    const today = year2021.toISOString().split('T')[0]; // YYYY-MM-DD;

    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
    const params = new URLSearchParams({ earth_date: today, camera: 'FHAZ', api_key: process.env.NASA_API_KEY });
    console.log('url', url, 'params', params.toString());

    const resp = await axios.get(url, { params });
    const onePhoto = resp.data.photos[0];

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
      eleventyConfig.addGlobalData('geo', context.geo);
      eleventyConfig.addGlobalData('photo', onePhoto);
    });

    // console.log(context.geo);

    return await edge.handleResponse();
  } catch (e) {
    console.log('ERROR', { e });
    return context.next(e);
  }
};
