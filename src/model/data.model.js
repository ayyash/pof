import { toHTML } from '@portabletext/to-html';
import { Config } from './client.js';
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
  // add tweet

  return data.items.map(n => {
    const title = n.title.replace(/"/g, '′');
    const _url = Config.Url + `posts/${n.slug}/`;
    let tweet = `${title} ${Config.Hashtag} ${_url} - `;
    const desc = toHTML(n.body, { components: stripSerializer }).replace('"', '′').slice(0, Config.TweetLen - Config.TweetLinkLen);
    tweet = `${tweet}${desc}`;

    const twitterLink = Config.TwitterLink.replace('$0', encodeURIComponent(tweet))

    return {
      ...n,
      content: toHTML(n.body, { components: serializers }),
      description: toHTML(n.body, { components: stripSerializer }),
      tweet: twitterLink
    }
  });
}

export const NewText = (data) => {
  // transform items using portable text
  return data.reduce((acc, item) => {
    acc[item.slug] = toHTML(item.body, { components: serializers })
    return acc;
  }
    , {});
}
