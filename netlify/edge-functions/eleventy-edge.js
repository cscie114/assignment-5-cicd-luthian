import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";


export default async (request, context) => {
  try {
    
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ["appearance", "username"]
    });

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
      eleventyConfig.addGlobalData("geo", context.geo);
    });

    console.log(context.geo);
  
    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
