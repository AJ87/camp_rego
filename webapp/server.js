'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');
var database = require('./database.js');
var regoFunction = require('./rego.js');

const max_children = 125; // 125
const max_regos = 600; // 600
const overrideCode = '7f74c2b8-1ab6-4221-906b-5c3756132c4e';
const overridePreCode = '4kgiKU-FDiDknk9-kdi-932fKF-dKD98D9ldkD';

var toLocalDate = function(utcDate) {
  var TZOffsetMs = 15*60*60*1000;
  var localDate = utcDate.getTime() + TZOffsetMs;
  return new Date(localDate);
}

database.initialise()
.then(
  function fullfilled(result) {

  regoFunction.initialise(database);

http.createServer(function (request, response) {
    console.log('request starting...');
    console.log(`URL: ${request.url}`);

    var filePath = '.' + request.url;

    filePath = filePath.split('?');
    var params = filePath[1];
    filePath = filePath[0];

    console.log(`File path: ${filePath}`);
    console.log(`Params: ${params}`);

// check for regoID param
    var override = false;
    var overridePre = false;
    if (params !== undefined) {
      var paramArray = params.split('&');
      if (paramArray.length > 1) {
        params = paramArray[0];
        if (paramArray[1] === `regoID=${overrideCode}`) {
           override = true;
        }
        if (paramArray[1] === `regoID=${overridePreCode}`) {
          overridePre = true;
        }
      }
    }

    var waitlist = false;
    var paramArray;

    if (filePath == './') {
        filePath = './index.html';
    }

    if (filePath == './rego') {
      var body = "";
      if (request.method == 'POST') {
        var ip = request.headers['x-forwarded-for'] ||
                 request.connection.remoteAddress;
        console.log("Submission from IP: " + ip + ' on ' + new Date());
        request.on('error', function(err) {
          console.log(err);
        }).on('data', function(chunk) {
          body += chunk;
          if (body.length > 1e6) {
            request.connection.destroy();
          }
        }).on('end', function() {
          var json = JSON.parse(body);
          console.log(json);
          console.log(json.child[0].birthdate);
          for (var child of json.child) {
            var newDate = toLocalDate(new Date(child.birthdate));
            console.log(newDate);
            child.birthdate = newDate.toJSON();
          }

          if (regoFunction.getNumberOfChildren() > max_regos &&
              override === false) {
            console.log("Rego and waitlist already full. Above was not saved");
            response.writeHead(503, { 'Content-Type': 'text/html' });
            response.end("Registration full", 'utf-8');
          } else {
            paramArray = params.split('=');
            if (overridePre === false && paramArray[0] === 'waitlist' && paramArray[1] === 'true') {
              waitlist = true;
            }
            var rego = regoFunction.createRego(json);
            rego.saveData(waitlist)
            .then(
              function fullfilled(result) {
                if (waitlist) {
                  response.writeHead(201, { 'Content-Type': 'text/html' });
                } else {
                  response.writeHead(200, { 'Content-Type': 'text/html' });
                };
                response.end("Success", 'utf-8');
              },
              function rejected(reason) {
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.end("Error saving data on server", 'utf-8');
              }
            );
          }
        })
      }
    } else if (filePath == './registrations' || filePath.substring(0,15) == './registration/') {
      var registration = regoFunction.createGetter();
      if (filePath == './registrations') {
        paramArray = params.split('=');
        if (paramArray[0] === 'waitlist' && paramArray[1] === 'true') {
          waitlist = true;
        }
        registration.getData(null,waitlist)
        .then(
          function fullfilled(json) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(json));
          },
          function rejected(reason) {
            console.log(reason);
          }
        );
      } else {
        var filePathArray = filePath.split('/');
        console.log(filePathArray[2]);
        registration.getData(filePathArray[2],null)
        .then(
          function fullfilled(json) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(json));
          },
          function rejected(reason) {
            console.log(reason);
          }
        );
      }
    } else if (filePath.substring(0,9) == './colour/') {
      var filePathArray = filePath.split('/');
      regoFunction.getColour(filePathArray[2])
      .then(
        function fullfilled(json) {
          console.log(JSON.stringify(json));
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(json));
        },
        function rejected(reason) {
          console.log(reason);
        }
      );
    } else if (filePath == './colourgroup/metadata') {
      regoFunction.getColourGroupMetadata()
      .then(
        function fullfilled(json) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(json));
        },
        function rejected(reason) {
          console.log(reason);
        }
      );
    } else if (filePath.substring(0,22) == './colourgroup/download') {
      var colourGroup;
      paramArray = params.split('=');
      if (paramArray[0] === 'colour') {
        colourGroup = paramArray[1];
      }
      regoFunction.colourGroupDownload(colourGroup)
      .then(
        function fullfilled(result) {
          console.log('Download success');
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(result, 'utf-8');
        },
        function rejected(reason) {
          console.log('Download failed');
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        }
      );
    } else if (filePath.substring(0,7) == './rego/') {
      var id, name, colour;

      if (request.method == 'POST') {
        filePathArray = filePath.split('/');
        id = filePathArray[2];

        if (filePathArray[3] == 'child') {
          name = filePathArray[4];
          // convert %20 into space
          name = name.replace(/%20/g, " ");
        }

        paramArray = params.split('=');
        if (paramArray[0] === 'colour') {
          colour = paramArray[1];
        }

        console.log(`id: ${id}, name: ${name}, colour: ${colour}`);

        regoFunction.saveColour(id,name,colour)
        .then(
          function fullfilled(result) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end();
          },
          function rejected(reason) {
            console.log(reason);
          }
        );
      }
    } else if (filePath == './registerFromWaitlist') {
      paramArray = params.split('=');

      if (paramArray[0] === 'regoID') {
        regoFunction.register(paramArray[1])
        .then(
          function fullfilled(result) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end();
          },
          function rejected(reason) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end();
          }
        );
      }
    } else if (filePath == './unregister') {
      paramArray = params.split('=');

      if (paramArray[0] === 'regoID') {
        regoFunction.unregister(paramArray[1])
        .then(
          function fullfilled(result) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end();
          },
          function rejected(reason) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end();
          }
        );
      }
    } else if (filePath == './numberOfChildren') {
      paramArray = params.split('=');

      if (paramArray[0] === 'regoID' && paramArray[1] === overrideCode) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end();
      } else {
        if (regoFunction.getNumberOfChildren() < max_children) {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end();
        } else if (regoFunction.getNumberOfChildren() > max_regos) {
          // waitlist already full - accept no new regos
          response.writeHead(503, { 'Content-Type': 'text/html' });
          response.end();
        } else {
          // rego full but still accepting regos on waitlist
          response.writeHead(500, { 'Content-Type': 'text/html' });
          response.end();
        }
      }
    } else if (filePath == './preRegistration') {

      var body = "";
      if (request.method == 'POST') {
        var ip = request.headers['x-forwarded-for'] ||
                 request.connection.remoteAddress;
        console.log("Submission from IP: " + ip + ' on ' + new Date());
        request.on('error', function(err) {
          console.log(err);
        }).on('data', function(chunk) {
          body += chunk;
          if (body.length > 1e6) {
            request.connection.destroy();
          }
        }).on('end', function() {
          var json = JSON.parse(body);
          console.log(json);
          console.log(json.email);

          regoFunction.saveEmail(json)
          .then(
            function fullfilled(result) {
              response.writeHead(200, { 'Content-Type': 'text/html' });
              response.end();
            },
            function rejected(reason) {
              response.writeHead(500, { 'Content-Type': 'text/html' });
              response.end();
            }
          );
        })
      }
    } else if (filePath == './registrations/download') {
      console.log('Download');
      regoFunction.download()
      .then(
        function fullfilled(result) {
          console.log('Download success');
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(result, 'utf-8');
        },
        function rejected(reason) {
          console.log('Download failed');
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        }
      );
    } else if (filePath == './registrations/downloadChild') {
      console.log('Child');
      regoFunction.downloadChild()
      .then(
        function fullfilled(result) {
          console.log('Download success');
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(result, 'utf-8');
        },
        function rejected(reason) {
          console.log('Download failed');
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        }
      );
    } else {

// protect some files from being read
// don't block robots.txt or manifest.json
      if ( filePath === './start_server.sh' ||
           filePath === './package.json' ||
           filePath === './createemail.sh' ||
           filePath === './sendemail.sh') {
            console.log("filepath: " + filePath);
            response.writeHead(503);
            response.end('Unauthorised Access');
            response.end();
      } else {

        console.log(filePath);

        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    console.log("filepath: " + filePath);
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
      }
    }

}).listen(80); //3125 loally and 80 on aws
console.log('Server running at http://127.0.0.1:80/');

},
function rejected(reason) {
  console.log(`Error initialising database: ${reason}`);
}
);
