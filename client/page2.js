const loader = require('./loader.js');
const clientCode = require('./client.js');

window.onload = () => clientCode.sendGet('/getUsers', 'get');
//Object.values(obj).forEach(user => {  })