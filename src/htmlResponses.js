const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const js = fs.readFileSync(`${__dirname}/../client/client.js`);
// unused for now
// const index2 = fs.readFileSync(`${__dirname}/../client/app.html`);
// const cs2 = fs.readFileSync(`${__dirname}/../client/style2.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

//
//const getIndex2 = (request, response) =>
//{
//  response.writeHead(200, {'Content-Type': 'text/html'});
//  response.write(index2);
//  response.end();
//}

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};
// update server.js accordingly
const getJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(js);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getJS,
};
