module.exports = function (eleventyConfig) {
  // this is a must, pass through your assets
  eleventyConfig.addPassthroughCopy("src/assets");
  return {
    dir: {
      input: "src"
      // the default output is _site
      // yentan
    }
  }
};
