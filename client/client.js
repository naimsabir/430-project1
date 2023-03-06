//Change handleResponse to maybe display the response data in a web component for cards
const ideaCard = require('./ideaCard.js');

const handleResponse = async (response, shouldParse) =>
{
  const content = document.querySelector('#content');

  switch(response.status) {
    case 200: //success
      content.innerHTML = `<b>Success</b>`;
      break;
    case 201: //created
      content.innerHTML = '<b>Created</b>';
      break;
    case 204: //updated (no response back from server)
      content.innerHTML = '<b>Updated (No Content)</b>';
      return;
    case 400: //bad request
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    default: //any other status code
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }

  
  if(shouldParse)
  {
    let obj = await response.json();
    if(obj.message)
    {
      content.innerHTML += `<p>${obj.message}</p>`;
    }
    else
    {
      content.innerHTML += JSON.stringify(obj);
    }
  }
  
  else 
  {
    content.innerHTML += `<p>Meta Data Received</p>`;
  }
  
  
};

const handleGet = async (response, shouldParse) =>
{
  const content = document.querySelector("#statusIndicator");
  const cardSection = document.querySelector("#cards");

  switch(response.status) {
    case 200: //success
      content.innerHTML = `<b>Success</b>`;
      break;
    case 201: //created
      content.innerHTML = '<b>Created</b>';
      break;
    case 204: //updated (no response back from server)
      content.innerHTML = '<b>Updated (No Content)</b>';
      return;
    case 400: //bad request
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    case 404:
      content.innerHTML = `<b>Error</b>`;
      break;
    default: //any other status code
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }
  if(shouldParse)
  {
    //Object.values(obj).forEach(user => {  })
    let obj = await response.json();
    Object.values(obj).forEach(user => {
      //const ideaCard = document.createElement("idea-card");
      //ideaCard.dataset.title = user.title;
      //ideaCard.dataset.type = user.type;
      //ideaCard.dataset.description = user.description;
      //cardSection.appendChild(ideaCard);
      for(thing in user)
      {
        const ideaCard = document.createElement("idea-card");
        ideaCard.dataset.title = user[thing].title;
        ideaCard.dataset.type = user[thing].type;
        ideaCard.dataset.description = user[thing].description;
        cardSection.appendChild(ideaCard);
      }
    });
  }
}

const sendPost = async (titleForm, inputForm) =>
{
  const nameAction = titleForm.getAttribute('action');
  const nameMethod = titleForm.getAttribute('method');

  const input = inputForm.value;
  console.log(`textField value: ${inputForm.value}`);

  const titleField = titleForm.querySelector("#titleField");
  const typeField = titleForm.querySelector("#ideaType");

  const formData = `title=${titleField.value}&type=${typeField.value}&description=${input}`;

  let response = await fetch(nameAction, {
    method: nameMethod,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: formData,
  });
  inputForm.value = "";
  titleField.value = "";
  handleResponse(response, true);
};

const sendGet = async (url, method) =>
{
  console.log("button clicked");
  const options =
  {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
  };
  let response = await fetch(url, options);
  //console.log(response);
  
  handleGet(response, method === 'get');
};

const getUser = (e) =>
  {
    //const selectorField = document.querySelector("#urlField").value;
    //const methodField = document.querySelector("#methodSelect").value;
    e.preventDefault();
   sendGet('/getUsers', 'GET');
    return false;
  }

const init = () => 
{
  const titleForm = document.querySelector("#titleForm");
  //const userForm = document.querySelector("#userForm");
  

  const addUser = (e) =>
  {
    const inputForm = document.querySelector("#textField");
    e.preventDefault();
    sendPost(titleForm, inputForm);
    return false;
  }

  titleForm.addEventListener('submit', addUser);
  //userForm.addEventListener('submit', getUser);
};

//window.onload = init;

module.exports = {
  handleResponse,
  sendPost,
  sendGet,
  init,
  getUser,
};