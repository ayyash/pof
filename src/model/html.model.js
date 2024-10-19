
// default seralizers here
export const SerializerBlock = (props) => {

  const style = props.node.style || 'normal';

  if (/^h\d/.test(style)) {
      const level = style.replace(/[^\d]/g, '');
      return `<h${level} class="f${level}">${props.children}</h${level}>`;
  }

  if (style === 'pullquote' || style === 'blockquote') {
      const _css = style === 'pullquote' ? 'vanity' : '';
      // dont trim just yet, its not straigh forward just make sure content is trimmed
      return `<div class="quoted ${_css}"><blockquote>${props.children}</blockquote></div>`;
  }

  return `<p>${props.children}</p>`;
};

// mark type highlight
export const SerializeDecorators = (props) => {

  switch (props.markType) {
      case 'small':
          return `<span class='smaller'>${props.children}</span>`;
      case 'red':
          return `<span class='red'>${props.children}</span>`;
      default:
          return `<span>${props.children}</span>`;
  }
};
// mark type link
export const SerializerLink = (props) => {
  // add rel
  return `<a rel="noreferrer" href="${props.value.href}" target="_blank">${props.children}</a>`;
};

