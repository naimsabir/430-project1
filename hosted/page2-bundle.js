/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("//Change handleResponse to maybe display the response data in a web component for cards\r\nconst ideaCard = __webpack_require__(/*! ./ideaCard.js */ \"./client/ideaCard.js\");\r\n\r\nconst handleResponse = async (response, shouldParse) =>\r\n{\r\n  const content = document.querySelector('#content');\r\n\r\n  switch(response.status) {\r\n    case 200: //success\r\n      content.innerHTML = `<b>Success</b>`;\r\n      break;\r\n    case 201: //created\r\n      content.innerHTML = '<b>Created</b>';\r\n      break;\r\n    case 204: //updated (no response back from server)\r\n      content.innerHTML = '<b>Updated (No Content)</b>';\r\n      return;\r\n    case 400: //bad request\r\n      content.innerHTML = `<b>Bad Request</b>`;\r\n      break;\r\n    default: //any other status code\r\n      content.innerHTML = `Error code not implemented by client.`;\r\n      break;\r\n  }\r\n\r\n  \r\n  if(shouldParse)\r\n  {\r\n    let obj = await response.json();\r\n    if(obj.message)\r\n    {\r\n      content.innerHTML += `<p>${obj.message}</p>`;\r\n    }\r\n    else\r\n    {\r\n      content.innerHTML += JSON.stringify(obj);\r\n    }\r\n  }\r\n  \r\n  else \r\n  {\r\n    content.innerHTML += `<p>Meta Data Received</p>`;\r\n  }\r\n  \r\n  \r\n};\r\n\r\nconst handleGet = async (response, shouldParse) =>\r\n{\r\n  const content = document.querySelector(\"#statusIndicator\");\r\n  const cardSection = document.querySelector(\"#cards\");\r\n\r\n  switch(response.status) {\r\n    case 200: //success\r\n      content.innerHTML = `<b>Success</b>`;\r\n      break;\r\n    case 201: //created\r\n      content.innerHTML = '<b>Created</b>';\r\n      break;\r\n    case 204: //updated (no response back from server)\r\n      content.innerHTML = '<b>Updated (No Content)</b>';\r\n      return;\r\n    case 400: //bad request\r\n      content.innerHTML = `<b>Bad Request</b>`;\r\n      break;\r\n    case 404:\r\n      content.innerHTML = `<b>Error</b>`;\r\n      break;\r\n    default: //any other status code\r\n      content.innerHTML = `Error code not implemented by client.`;\r\n      break;\r\n  }\r\n  if(shouldParse)\r\n  {\r\n    //Object.values(obj).forEach(user => {  })\r\n    let obj = await response.json();\r\n    Object.values(obj).forEach(user => {\r\n      //const ideaCard = document.createElement(\"idea-card\");\r\n      //ideaCard.dataset.title = user.title;\r\n      //ideaCard.dataset.type = user.type;\r\n      //ideaCard.dataset.description = user.description;\r\n      //cardSection.appendChild(ideaCard);\r\n      for(thing in user)\r\n      {\r\n        const ideaCard = document.createElement(\"idea-card\");\r\n        ideaCard.dataset.title = user[thing].title;\r\n        ideaCard.dataset.type = user[thing].type;\r\n        ideaCard.dataset.description = user[thing].description;\r\n        cardSection.appendChild(ideaCard);\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\nconst sendPost = async (titleForm, inputForm) =>\r\n{\r\n  const nameAction = titleForm.getAttribute('action');\r\n  const nameMethod = titleForm.getAttribute('method');\r\n\r\n  const input = inputForm.value;\r\n  console.log(`textField value: ${inputForm.value}`);\r\n\r\n  const titleField = titleForm.querySelector(\"#titleField\");\r\n  const typeField = titleForm.querySelector(\"#ideaType\");\r\n\r\n  const formData = `title=${titleField.value}&type=${typeField.value}&description=${input}`;\r\n\r\n  let response = await fetch(nameAction, {\r\n    method: nameMethod,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json',\r\n    },\r\n    body: formData,\r\n  });\r\n  inputForm.value = \"\";\r\n  titleField.value = \"\";\r\n  handleResponse(response, true);\r\n};\r\n\r\nconst sendGet = async (url, method) =>\r\n{\r\n  console.log(\"button clicked\");\r\n  const options =\r\n  {\r\n    method: method,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json',\r\n    },\r\n  };\r\n  let response = await fetch(url, options);\r\n  //console.log(response);\r\n  \r\n  handleGet(response, method === 'get');\r\n};\r\n\r\nconst getUser = (e) =>\r\n  {\r\n    //const selectorField = document.querySelector(\"#urlField\").value;\r\n    //const methodField = document.querySelector(\"#methodSelect\").value;\r\n    e.preventDefault();\r\n   sendGet('/getUsers', 'GET');\r\n    return false;\r\n  }\r\n\r\nconst init = () => \r\n{\r\n  const titleForm = document.querySelector(\"#titleForm\");\r\n  //const userForm = document.querySelector(\"#userForm\");\r\n  \r\n\r\n  const addUser = (e) =>\r\n  {\r\n    const inputForm = document.querySelector(\"#textField\");\r\n    e.preventDefault();\r\n    sendPost(titleForm, inputForm);\r\n    return false;\r\n  }\r\n\r\n  titleForm.addEventListener('submit', addUser);\r\n  //userForm.addEventListener('submit', getUser);\r\n};\r\n\r\n//window.onload = init;\r\n\r\nmodule.exports = {\r\n  handleResponse,\r\n  sendPost,\r\n  sendGet,\r\n  init,\r\n  getUser,\r\n};\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/client.js?");

/***/ }),

/***/ "./client/ideaCard.js":
/*!****************************!*\
  !*** ./client/ideaCard.js ***!
  \****************************/
/***/ (() => {

eval("// CURRENT STATUS - This is just the anime card code from 330 Project 1.\n//                 But it should be sufficient for this project it just needs to be simplified like a lot.\n//                 I can keep the layout with a couple image links for type of ideas. But let's table that\n//                 for if I have time because it can work without images it will just look kinda boring.\nconst template = document.createElement('template');\ntemplate.innerHTML = `\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css\">\n<style>\n.card\n{\n    width: auto;\n    height: auto;\n    position: relative;\n}\nbutton:hover\n{\n    background-color: #67468c;\n}\n@media screen and (min-width: 760px)\n{\n  .card\n  {\n      width: 300px;\n      height: 400px;\n      position: relative;\n      overflow: auto;\n  }\n  button:hover\n  {\n      background-color: #67468c;\n  }\n  /* width */\n  ::-webkit-scrollbar \n  {\n    width: 5px;\n  }\n\n  /* Track */\n  ::-webkit-scrollbar-track \n  {\n    background: #f1f1f1; \n  }\n  \n  /* Handle */\n  ::-webkit-scrollbar-thumb \n  {\n      background: #1985A1; \n      border-radius: 5px; \n  }\n\n  /* Handle on hover */\n  ::-webkit-scrollbar-thumb:hover \n  {\n    background: #67468c; \n  }\n}\n</style>\n<div>\n    <div class=\"card\" pb-3 pr-3>\n    <div class=\"card-content\">\n      <div class=\"media\">\n        <div class=\"media-content\">\n          <p class=\"title is-5\" id=\"title\"></p>\n          <p class=\"subtitle is-5\" id=\"type\"></p>\n          <p class=\"subtitle is-6\" id=\"description\"></]>\n        </div>\n      </div>\n      <div class=\"content\"></div>\n    </div>\n    </div>\n</div>\n`;\n\nclass IdeaCard extends HTMLElement {\n  constructor() {\n    super();\n    // 1 - attach a shadow DOM tree to this instace -  this creates `.shadowRoot` for us\n    this.attachShadow({ mode: 'open' });\n\n    // 2 - Clone `template` and append it\n    this.shadowRoot.appendChild(template.content.cloneNode(true));\n  }\n\n  connectedCallback() {\n    this.shadowRoot.querySelector('#title').innerHTML = this.dataset.title;\n    this.shadowRoot.querySelector('#type').innerHTML = this.dataset.type;\n    this.shadowRoot.querySelector('#description').innerHTML = this.dataset.description;\n  }\n}\ncustomElements.define('idea-card', IdeaCard);\n\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/ideaCard.js?");

/***/ }),

/***/ "./client/loader.js":
/*!**************************!*\
  !*** ./client/loader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client.js */ \"./client/client.js\");\n/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ideaCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ideaCard.js */ \"./client/ideaCard.js\");\n/* harmony import */ var _ideaCard_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ideaCard_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _navbar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar.js */ \"./client/navbar.js\");\n/* harmony import */ var _navbar_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_navbar_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/loader.js?");

/***/ }),

/***/ "./client/navbar.js":
/*!**************************!*\
  !*** ./client/navbar.js ***!
  \**************************/
/***/ (() => {

eval("const template = document.createElement('template');\ntemplate.innerHTML = `\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css\">\n<nav class=\"navbar has-shadow is-dark\">\n  <!-- logo / brand -->\n  <div class=\"navbar-brand\">\n    <a class=\"navbar-burger\" id=\"burger\">\n      <span></span>\n      <span></span>\n      <span></span>\n    </a>\n  </div>\n\n  <div class=\"navbar-menu\" id=\"nav-links\">\n    <div class=\"navbar-start\">\n      <a id=\"home\" class=\"navbar-item is-hoverable\" href=\"client.html\">\n        Write\n      </a>\n      \n      <a id=\"app\" class=\"navbar-item is-hoverable\" href=\"app.html\">\n        View\n      </a>\n\n    </div> <!-- end navbar-start -->\n    </div>\n\n  </div>\n</nav>\n`;\n\nclass Nav extends HTMLElement {\n  constructor() {\n    super();\n    this.attachShadow({ mode: 'open' });\n    this.shadowRoot.appendChild(template.content.cloneNode(true));\n\n    this.burger = this.shadowRoot.querySelector('#burger');\n    this.navMen = this.shadowRoot.querySelector('#nav-links');\n\n    if (this.dataset.current) {\n      this.shadowRoot.querySelector(`#${this.dataset.current}`).classList.add('has-text-weight-bold');\n    }\n  }\n\n  connectedCallback() {\n    this.burger.addEventListener('click', () => {\n      this.navMen.classList.toggle('is-active');\n    });\n  }\n\n  static get observedAttributes() {\n    return ['data-current'];\n  }\n}\ncustomElements.define('app-nav', Nav);\n\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/navbar.js?");

/***/ }),

/***/ "./client/page2.js":
/*!*************************!*\
  !*** ./client/page2.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const loader = __webpack_require__(/*! ./loader.js */ \"./client/loader.js\");\r\nconst clientCode = __webpack_require__(/*! ./client.js */ \"./client/client.js\");\r\n\r\nwindow.onload = () => clientCode.sendGet('/getUsers', 'get');\r\n//Object.values(obj).forEach(user => {  })\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/page2.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/page2.js");
/******/ 	
/******/ })()
;