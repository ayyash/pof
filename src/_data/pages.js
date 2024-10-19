
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


export default async function () {
  try {
    const response = await fetch('https://vjoh9zmj.api.sanity.io/v2021-10-21/data/query/production?query=' + url);
    const data = await response.json();
    // transform items using portable text
    data.result.items.forEach(item => {
      item.body = item.body.map(block => {
        console.log(block._type);
        if (block._type === 'block') {
          return block.children.map(child => child.text).join('');
        }
        if (block._type === 'image') {
          return `<img src="${block.asset.url}" alt="${block.alt}" />`;
        }
        return '';
      }).join('');
    });
    return data.result.items;
  } catch (error) {
    console.error(error);
  }

};
