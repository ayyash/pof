import urlBuilder from '@sanity/image-url';


export const Config = {
  ProjectId: 'vjoh9zmj',
  Dataset: 'production'
};
export const clientConfig = {
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
