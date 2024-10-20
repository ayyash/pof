
import { fetchSanity } from '../model/client.js';
import { NewText } from '../model/data.model.js';

export default async function () {
  const query = `*[_type == "content"]
                {
                    _id,
                    "slug": slug.current,
                    body[]
                }`;

  const result = await fetchSanity(query);
  return NewText(result);

};

