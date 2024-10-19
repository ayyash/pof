
import { toHTML } from '@portabletext/to-html';
import { SerializeDecorators, SerializerBlock, SerializerLink } from '../model/html.model.js';

const query = `{
                "items": *[_type == "post"] | order(publishedAt desc)
                {
                    publishedAt, _id,
                    "mainImage":mainImage.asset->url,
                    "slug": slug.current,
                    title,
                    body[]
                }
                [0...2],
                "total": count(*[_type == "post"])
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
    // transform items using portable text
    return data.result.items.map(n => {
      return {
        ...n,
        content: toHTML(n.body, { serializers })
      }
    });
  } catch (error) {
    console.error(error);
  }

};
