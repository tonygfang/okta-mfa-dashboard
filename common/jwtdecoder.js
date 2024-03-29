function jsonPP(input) {
  var obj = JSON.parse(input);
  return JSON.stringify(obj, undefined, 4);
}

function jwtPP(token, part = 0) {
  var token_parts = token.split('.');
  var rawJson = Buffer.from(token_parts[part], 'base64').toString();
  return jsonPP(rawJson);
}

function getHeader(token) {
  return jwtPP(token, 0);
}

function getPayload(token) {
  //console.log(token);
  return jwtPP(token, 1);
}

function decodeToken(token) {
  return {
    'jwt': token,
    'header': getHeader(token),
    'payload': getPayload(token)
  }
}

module.exports = {
  decodeToken
};
