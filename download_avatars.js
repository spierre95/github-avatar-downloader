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
  cb(err, JSON.parse(body));
});

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var element of result){
    downloadImageByURL(element.avatar_url,`./avatars/${element.login}_avatar.jpg`)
  }
});

function downloadImageByURL(url,filePath) {
request.get(url)
 .on('error', function (err) {
  throw err;
  })
  .on('response', function (response) {
   console.log(response.statusMessage)
   console.log(response.headers['content-type'])
  })
  .on('end', function(end) {
  console.log('Download complete.');
  })
  .pipe(fs.createWriteStream(filePath));
}






















