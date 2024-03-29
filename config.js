const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require("https");


var ISSUER = process.env.OKTA_URL + '/oauth2/' + process.env.AUTHORIZATION_SERVER;
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var SPA_CLIENT_ID = process.env.SPA_CLIENT_ID;
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK ? true : false;

var baseUrl = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
var redirectUrl = baseUrl + '/callback';


module.exports = {
  webServer: {
    port: 8080,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: baseUrl,
      scope: 'openid profile email offline_access device_sso',
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
  },
  resourceServer: {
    port: 8000,
    oidc: {
      clientId: SPA_CLIENT_ID,
      issuer: ISSUER,
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
    assertClaims: {
      aud: 'api://default',
      cid: SPA_CLIENT_ID
    }
  }
};
