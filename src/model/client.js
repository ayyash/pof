

export const Config = {
  ProjectId: 'vjoh9zmj',
  Dataset: 'production'
};


export const fetchSanity = async (query) => {
  try {
    const url = encodeURIComponent(query);
    const response = await fetch(`https://${Config.ProjectId}.api.sanity.io/v2021-10-21/data/query/${Config.Dataset}?query=` + url);
    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error(error);
  }
}
