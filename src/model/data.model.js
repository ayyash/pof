import { toHTML } from '@portabletext/to-html';
import { SerializeDecorators, SerializerBlock, SerializerLink } from './html.model.js';
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

export const NewPost = (data) => {
    // transform items using portable text
    return data.items.map(n => {
      return {
        ...n,
        content: toHTML(n.body, { components: serializers })
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
