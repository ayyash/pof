
import { rmSync } from 'fs';
rmSync('./dist', {recursive: true, force: true});
// first get the dev config in
import devConfig from "./.eleventy.js";

export default function (eleventyConfig) {
  // pass everything from config
  const config = devConfig(eleventyConfig);

  // set different output, you can deep clone first but it's too much work
  // TODO: add diferent html
  return {
    dir: {
      input: config.dir.input,
      output: "dist"
    }
  };
};
