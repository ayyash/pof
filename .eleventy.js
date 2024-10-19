export default function (eleventyConfig) {
  // this is a must, pass through your assets
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPairedShortcode("modal", function (content, title, trigger, footer) {
    return `
    <div class="dr-modal-overlay modal-overlay" data-trigger="${trigger}">
        <div class="modal dr-window" role="dialog" aria-labelledby="modaltitle" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content dr-content">
                    <div class="modal-header">
                        <h6 class="f6 modal-title dr-title">${title}</h6>
                        <button type="button" class="modal-close dr-close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${footer ? `<div class="modal-footer">${footer}</div>` : ``}
                </div>
            </div>
        </div>
    </div>`;
  });

  return {
    dir: {
      input: "src"
      // the default output is _site
    }
  }
};
