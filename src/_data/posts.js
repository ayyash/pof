
import { fetchSanity } from '../model/client.js';
import { NewPost } from '../model/data.model.js';

const query = `{
                "items": *[_type == "post"] | order(publishedAt desc)
                {
                    publishedAt, _id,
                    "mainImage":mainImage.asset->url,
                    "slug": slug.current,
                    title,
                    body[]
                }
                [],
                "total": count(*[_type == "post"])
                }`;


export default async function () {
  const result = await fetchSanity(query);
  return NewPost(result);

};
