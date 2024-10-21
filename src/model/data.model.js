import { toHTML } from '@portabletext/to-html';
import { SerializeDecorators, SerializerBlock, SerializerLink, StripAll, StripMark } from './html.model.js';
import { SerializerImage } from './image.model.js';


const serializers = {
  block: SerializerBlock,
  types: {
    image: SerializerImage
  },
  marks: {
    red: SerializeDecorators,
    small: SerializeDecorators,
    link: SerializerLink
  }
};

const stripSerializer = {
  block: StripAll,
  marks: {
    red: StripMark,
    small: StripMark,
    link: StripMark
  }
}
export const NewPost = (data) => {
    // transform items using portable text
    return data.items.map(n => {
      return {
        ...n,
        content: toHTML(n.body, { components: serializers }),
        description: toHTML(n.body, { components: stripSerializer })
      }
    });
}

export const NewText = (data) => {
  // transform items using portable text
  return data.reduce((acc, item) => {
    acc[item.slug] = toHTML(item.body, {components: serializers })
    return acc;
  }
  , {});
}
