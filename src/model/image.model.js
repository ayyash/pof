import urlBuilder from '@sanity/image-url';
import { Config } from './client.js';

const clientConfig = {
  projectId: Config.ProjectId,
  dataset: Config.Dataset
};


const builder = urlBuilder({
  ...clientConfig
});


export const imageUrlFor = (image, type) => {
  let width = 50;
  switch (type) {
    case 'Tiny':
      width = 100;
      break;
    case 'Small':
      width = 200;
      break;
    case 'Medium':
      width = 300;
      break;
    case 'Large':
      width = 500;
      break;
    case 'Original':
      width = 1300; // guessing
      break;
  }

  return builder.image(image).format('webp').auto('format').fit('max').width(width).url().toString();

}

export const SerializerImage = (props) => {
  // rebuild options, using props.options, and figure out the format
  // leave as empty if animated, else make wepb
  const urlOptions = clientConfig;
  const options = {
    ...props.value,
    fit: 'min',
    auto: 'format',
    fm: 'webp',
  }

  const fullUrl = urlBuilder(urlOptions).image(options).toString();

  const img = `<img src="${fullUrl}" class="content-image"
     loading="lazy" />`;
  return `<figure>${img}</figure>`;
};
