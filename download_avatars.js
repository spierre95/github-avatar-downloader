var request = require('request');
var authorize = require('./secrets.js')
var fs = require('fs')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {

  url:"https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

  headers: {
      'User-Agent':'request',
      'Authorization': 'token ' + authorize.token
    }
  }

request(options, function(err, res, body) {
  cb(err, body);
});
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

