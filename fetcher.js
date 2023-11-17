const fs = require('fs');


let arg1 = process.argv.slice(2)[0];
let arg2 = process.argv.slice(2)[1];

const filePath = './index.html';

const request = require('request');


if (!fs.existsSync(arg2)) {
  console.error('Path is invalid. File does not exist.');
} else {
  request(arg1, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    
    if (!response || response.statusCode !== 200) {
      console.error('Request failed. Status code is not 200.');
    } else {
      fs.writeFile(arg2, body, (err) => {
        if (err) {
          console.error(`Error: ${err}`);
          return;
        }
      
        let fileContent = fs.readFileSync(filePath, 'utf-8');
        let characterCount = fileContent.length;
        console.log(`Downloaded and saved ${characterCount} bytes to ${arg2}`);
      });
    }
  });
}