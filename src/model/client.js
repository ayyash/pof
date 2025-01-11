

export const Config = {
  ProjectId: 'vjoh9zmj',
  Dataset: 'production',
  TweetLen: 280,
  TweetLinkLen: 23, // https://tweetdelete.net/resources/twitter-character-count/#:~:text=Out%20of%20Control-,How%20Many%20Characters%20Are%20in%20a%20Tweet%3F%3A%20A%20Brief,to%20280%20characters%20per%20post.
  Hashtag: '#Gaza',
  Url: 'https://israelpantsonfire.com/',
  TwitterLink: 'https://twitter.com/intent/tweet?text=$0'
};


export const fetchSanity = async (query) => {
  try {
    const url = encodeURIComponent(query);
    const response = await fetch(`https://${Config.ProjectId}.api.sanity.io/v2025-01-01/data/query/${Config.Dataset}?query=` + url);
    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error(error);
  }
}
