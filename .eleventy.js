
import { imageUrlFor } from './src/model/client.js';

export default function (eleventyConfig) {
  // this is a must, pass through your assets
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPairedShortcode("modal", function (content, title, trigger) {
    return `
      <div class="modal-overlay dr-overlay" data-trigger="${trigger}">
        <div class="modal" role="dialog" aria-labelledby="dialogtitle" tabindex="-1">
          <div class="modal-header">
              <h6 class="f6 modal-title dr-title" id="dialogtitle">${title}</h6>
              <button type="button" class="modal-close dr-close"><span class="triangle"></span></button>
          </div>
          <div class="modal-body dr-content">
              ${content}
          </div>

        </div>
      </div>
    `;
  });

  // eleventy filter
  eleventyConfig.addFilter("sanityimage", function(image, type){
    return imageUrlFor(image, type);
  });

  return {
    dir: {
      input: "src"
      // the default output is _site
    }
  }
};
