const users = {};

const respondJSON = (request, response, status, object) => {
  // console.log("respondJSON called");
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Idea and type are both required.',
  };

  if (!body.title || !body.type || !body.description) { //adding body.description doesn't work so I think the text field is working
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  // If the user doesn't exist yet
  if (!users[body.title]) {
    responseCode = 201;
    users[body.title] = {};
  }

  users[body.title].title = body.title;
  users[body.title].type = body.type;
  users[body.title].description = body.description;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  addUser,
};
