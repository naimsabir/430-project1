const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const js = fs.readFileSync(`${__dirname}/../hosted/page2-bundle.js`);
// unused for now
const index2 = fs.readFileSync(`${__dirname}/../hosted/app.html`);
const cs2 = fs.readFileSync(`${__dirname}/../hosted/style2.css`);
const js2 = fs.readFileSync(`${__dirname}/../hosted/page1-bundle.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getIndex2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index2);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getCSS2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cs2);
  response.end();
};
// update server.js accordingly
const getJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(js);
  response.end();
};

const getJS2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(js2);
  response.end();
};

module.exports = {
  getIndex,
  getIndex2,
  getCSS,
  getCSS2,
  getJS,
  getJS2,
};
