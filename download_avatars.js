
var args = process.argv

var request = require('request');
var authorize = require('./secrets.js')
var fs = require('fs')

function getRepoContributors(repoOwner, repoName, cb) {
console.log('ran the function')

  var options = {

  url:"https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

  headers: {
      'User-Agent':'request',
      'Authorization': 'token ' + authorize.token
    }
  }

request(options, function(err, res, body) {
  console.log(err);
  cb(err, JSON.parse(body));
});

}

if(!args[2] || !args[3]){
  console.log('ERROR! Both fields must be filled out')
} else {
getRepoContributors(args[2], args[3], function(err, result) {
  console.log("Errors:", err);
  for (var element of result){
    downloadImageByURL(element.avatar_url,`./avatars/${element.login}_avatar.jpg`)
  }
});
}

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






















