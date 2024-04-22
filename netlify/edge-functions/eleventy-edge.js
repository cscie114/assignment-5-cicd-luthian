import '../../src/env.js';
import axios from 'axios';
import { EleventyEdge, precompiledAppData } from './_generated/eleventy-edge-app.js';

export default async (request, context) => {
  try {
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
      // Make geo and photo data available globally
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
