var dbox = require('dbox'),
  fs = require('fs'),
  path = require('path'),
  express = require('express');

var auth_path = path.join(__dirname, '../auth.json'),
  config = JSON.parse(fs.readFileSync(auth_path)),
  dboxapp = dbox.app(config),
  token = false,
  client = false;

var app = new express();

app.use(function  (req, res, next) {
  if (client || token) {
    next();
  } else {
    dboxapp.requesttoken(function(status, request_token){
      token = request_token;
      var oAuthURL = request_token.authorize_url + 
        '&oauth_callback=http://localhost:3000/access';
      res.redirect(oAuthURL);
    });
  }
});

app.get('/access', function  (req, res) {
  dboxapp.accesstoken(token, function (status, access_token) {
    client = dboxapp.client(access_token);
    res.redirect('/album');
  });
});

app.get('/album', function (req, res) {
  res.end('Done');
});

module.exports = app;