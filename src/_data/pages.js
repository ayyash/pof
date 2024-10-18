
const query = `{
                "items": *[_type == "post"] | order(publishedAt desc)
                {
                    publishedAt, _id,
                    "mainImage":mainImage.asset->url,
                    "slug": slug.current,
                    title,
                    body[]
                }
                [0...20],
                "total": count(*[_type == "post"])
                }`;

const url = encodeURIComponent(query);

module.exports = function () {
  return fetch('https://vjoh9zmj.api.sanity.io/v2021-10-21/data/query/production?query=' + url).then(
    response => response.json()
  )
  .then(data => data.result.items)
  .catch(error => {
    console.error(error);
  });

};
