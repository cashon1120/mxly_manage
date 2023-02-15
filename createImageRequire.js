const fs = require('fs');
const files = fs.readdirSync('./src/assets');
let Images = {};
let interface = {};
const fileTypes = ['png', 'jpg', 'jpeg'];
files.forEach(item => {
  const fileInfo = item.split('.');
  if (fileTypes.includes(fileInfo[1])) {
    const name = fileInfo[0];
    interface[name] = 'ImageSourcePropType';
    Images[name] = `require(./${item})`;
  }
});
Images = JSON.stringify(Images, null, '\t');
Images = Images.replace(/:\s"/g, ': ');
Images = Images.replace(/\(/g, '("');
Images = Images.replace(/\)"/g, '")');
Images = Images.replace(/"/g, "'");

interface = JSON.stringify(interface, null, '\t');
interface = interface.replace(/:\s"/g, ': ');
interface = interface.replace(/ImageSourcePropType"/g, 'ImageSourcePropType');

const string = `import {ImageSourcePropType} from 'react-native'\nexport interface ImagesProps${interface}\nconst Images: ImagesProps = ${Images} \nexport default Images`;
fs.writeFileSync('./src/assets/Images.ts', string);
