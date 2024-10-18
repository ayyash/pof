// first get the dev config in
const devConfig = require("./.eleventy.js");

module.exports = function (eleventyConfig) {
  // pass everything from config
  const config = devConfig(eleventyConfig);

  // set different output, you can deep clone first but it's too much work
  return {
    dir: {
      input: config.dir.input,
      // output: "dist"
    }
  };
};
