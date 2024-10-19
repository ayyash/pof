
import { toHTML } from '@portabletext/to-html';
import { SerializeDecorators, SerializerBlock, SerializerLink } from '../model/html.model.js';

const query = `*[_type == "content"]
                {
                    _id,
                    "slug": slug.current,
                    body[]
                }`;

const url = encodeURIComponent(query);

const serializers = {
  block: SerializerBlock,
  marks: {
    red: SerializeDecorators,
    small: SerializeDecorators,
    link: SerializerLink
  }
};

export default async function () {
  try {
    const response = await fetch('https://vjoh9zmj.api.sanity.io/v2021-10-21/data/query/production?query=' + url);
    const data = await response.json();
    // transform items and make it a key value, where key is the slug and value is the body
    // turn array to key value
    return data.result.reduce((acc, item) => {
      acc[item.slug] = toHTML(item.body, {components: serializers })
      return acc;
    }
    , {});
  } catch (error) {
    console.error(error);
  }

};
