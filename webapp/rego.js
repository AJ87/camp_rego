var json2csv = require('./utilities.js');
var email = require('./email.js');

var currentYear = 2019; // year SMAD Camp will be held

var counter = {id:'counter',
               counter:0};
var kids = {id:'kids',
            kids:0};

var db;

function updateCounter() {
// update counter on db
  db.updateRecord({id:'counter'},counter,'config')
  .then(
    function fullfilled(result) {
      console.log(`counter updated with ${counter.counter}`);
      console.log(counter.counter);
    },
    function rejected(reason) {
      console.log(`failed to update counter: ${reason}`);
    }
  );
}
function updateKids() {
// update kids on db
  db.updateRecord({id:'kids'},kids,'config')
  .then(
    function fullfilled(result) {
      console.log(`kids updated with ${kids.kids}`);
    },
    function rejected(reason) {
      console.log(`failed to update kids: ${reason}`);
    }
  );
}

function getColour(colour) {
// get the kids with that colour
  return new Promise( function pr(resolve,reject) {
    db.getCollection(null,'regos')
    .then(
      function fullfilled(result) {
        var children = [];
        for (var rego of result) {
          for (var child of rego.child) {
            if (child.colour == colour &&
                child.recordYear == currentYear &&
                child.waitlist == false) {
              children.push(child);
            }
          }
        }
        children.sort(function(a,b) {
          var x,y;
          if (a.year == 'Kindergarten') {
            x = 0;
          } else {
            x = a.year.slice(4);
          }
          if (b.year == 'Kindergarten') {
            y = 0;
          } else {
            y = b.year.slice(4);
          }
          return x - y;
        });
        resolve(children);
      },
      function rejected(reason) {
        resolve(reason);
      }
    );
  });
}

function formatDate(timestamp) {
  var year, month, day;

  year = timestamp.substr(0,4);
  month = timestamp.substr(5,2);
  day = timestamp.substr(8,2);

  return `${day}/${month}/${year}`;
}

function email_promise(email_address) {
  email.send_registration_confirmation(email_address)
  .then(
    function fullfilled(result) {
      //do nothing
    },
    function rejected(reason) {
      console.log('Failed to send Email to ', email_address);
      console.log(reason);
    }
  );
}

module.exports = {
  initialise: function(_db) {
    db = _db;

    email.initialise(db);
// set counter and kids from db
    db.getRecord({id:'counter'},'config')
    .then(
      function fullfilled(result) {
        console.log(`initialise counter: ${result.counter}`);
        counter.counter = result.counter;
      },
      function rejected(reason) {
        console.log(reason);
      }
    );

    db.getRecord({id:'kids'},'config')
    .then(
      function fullfilled(result) {
        console.log(`initialise kids: ${result.kids}`);
        kids.kids = result.kids;
      },
      function rejected(reason) {
        console.log(reason);
      }
    );
  },
  createRego: function(json) {
    var json = json;
    counter.counter = counter.counter + 1;
    updateCounter();

    kids.kids = kids.kids + json.child.length;
    updateKids();
    console.log(kids.kids);

    return {
      saveData: function(waitlist) {
        var rc = 0;
        var data = '';
        var childData = '';

        json.parent1.id = counter.counter;
        json.id = counter.counter;
        json.recordYear = currentYear;
        json.waitlist = waitlist;
        for (val of json.child) {
          val.id = counter.counter;
// fix the date format
          val.birthdate = formatDate(val.birthdate);
          val.waitlist = waitlist;
          val.recordYear = currentYear;
          val.colour = 'unassigned';
        }

// save db with record
        return new Promise( function pr(resolve,reject) {
          db.createRecord({id:counter.counter},json,'regos')
          .then(
            function fullfilled(result) {
              console.log(`saved record number ${counter.counter}`);
              console.log(json.parent1.firstName);
              email_promise({email:json.parent1.email, firstName:json.parent1.firstName});
              resolve(result);
            },
            function rejected(reason) {
              console.log(reason);
              reject(reason);
            }
          );
        });
      }
    };
  },
  createGetter: function() {
    return {
      getData: function(id,waitlist) {
        var json = {};
        return new Promise( function pr(resolve,reject) {
// get data from db
// call either resolve or reject
          if (id) {
            console.log(`id: ${id}`);
            var key = {id: +id};
            db.getRecord(key,'regos')
            .then(
              function fullfilled(result) {
                resolve(result.child);
              },
              function rejected(reason) {
                reject(reason);
              }
            );
          } else {
            key = {waitlist: waitlist};
            db.getCollection(key,'regos')
            .then(
              function fullfilled(result) {
                result.sort(function(a,b){
                  return a.id - b.id;
                });
                resolve(result);
              },
              function rejected(reason) {
                reject(reason);
              }
            );
          }
        });
      }
    };
  },
  getNumberOfChildren: function() {
    console.log(`kids: ${kids.kids}`);
    return kids.kids;
  },
  colourGroupDownload: function(colour) {
    return new Promise( function pr(resolve,reject) {
      getColour(colour).
      then(
        function fullfilled(result) {
          json2csv.convertColourGroup(result)
          .then(
            function fullfilled(csv) {
              resolve(csv);
            },
            function rejected(reason) {
              reject(reason);
            }
          );
        },
        function rejected(reason) {
          reject(reason);
        }
      );
    });
  },
  download: function() {
    return new Promise( function pr(resolve,reject) {
      console.log('Get collection');
      db.getCollection(null,'regos')
      .then(
        function fullfilled(result) {
          json2csv.convert(result)
          .then(
            function fullfilled(csv) {
              resolve(csv);
            },
            function rejected(reason) {
              reject(reason);
            }
          );
        },
        function rejected(reason) {
          console.log(`Failed reason: ${reason}`);
          reject(reason);
        }
      );
    });
  },
  downloadChild: function() {
    return new Promise( function pr(resolve,reject) {
      console.log('Get collection');
      db.getCollection(null,'regos')
      .then(
        function fullfilled(result) {
          var children = [];
          for (var rego of result) {
            for (var child of rego.child) {
              children.push(child);
            }
          }
          json2csv.convertChild(children)
          .then(
            function fullfilled(csv) {
              resolve(csv);
            },
            function rejected(reason) {
              reject(reason);
            }
          );
        },
        function rejected(reason) {
          console.log(`Failed reason: ${reason}`);
          reject(reason);
        }
      );
    });
  },
  register: function(id) {
    return new Promise(function pr(resolve, reject) {
      var key = {id: +id};
      db.getRecord(key,'regos')
      .then(
        function fullfilled(result) {
          result.waitlist = false;
          for (val of result.child) {
            val.waitlist = false;
          }
          db.updateRecord(key,result,'regos')
          .then(
            function fullfilled(result) {
              resolve(result);
            },
            function rejected(reason) {
              reject(reason);
            }
          );
        },
        function rejected(reason) {
          reject(reason);
        }
      );
    });
  },
  unregister: function(id) {
    return new Promise(function pr(resolve, reject) {
      var key = {id: +id};
      db.getRecord(key,'regos')
      .then(
        function fullfilled(result) {
          result.waitlist = true;
          for (val of result.child) {
            val.waitlist = true;
          }
          db.updateRecord(key,result,'regos')
          .then(
            function fullfilled(result) {
              resolve(result);
            },
            function rejected(reason) {
              reject(reason);
            }
          );
        },
        function rejected(reason) {
          reject(reason);
        }
      );
    });
  },
  saveEmail: function(json) {
// save to db
    return new Promise( function pr(resolve,reject) {
      json.recordYear = currentYear;
      db.createRecord(json,json,'emails')
      .then(
        function fullfilled(result) {
          console.log(`saved email: ${json.email}`);
          resolve(result);
        },
        function rejected(reason) {
          console.log(`email not saved: ${reason}`);
          resolve(reason);
        }
      );
    });
  },
  getColour: getColour,
  getColourGroupMetadata: function() {
    return new Promise( function pr(resolve,reject) {
      var colourArray = [['Unassigned','unassigned'],
       ['Maroon','maroon'],
       ['Red','red'],
       ['Orange','orange'],
       ['Yellow','yellow'],
       ['Light Green','lightgreen'],
       ['Dark Green','darkgreen'],
       ['Light Blue','lightblue'],
       ['Dark Blue','darkblue'],
       ['Light Purple','lightpurple'],
       ['Dark Purple','darkpurple'],
       ['Light Pink','lightpink'],
       ['Dark Pink','darkpink']];

       var promises = colourArray.map(function(x) {
         return getColour(x[1])
         .then(
           function fullfilled(result) {
             return {colour:`${x[0]} (${result.length})`};
           },
           function rejected(reason) {
             reject(reason);
           }
         );
       });

       Promise.all(promises).then(function fullfilled(results) {
         resolve(results);
       });
    });
  },
  saveColour: function(id,name,colour) {
// update kids colour
    return new Promise( function pr(resolve,reject) {
      var key = {id: +id};
      db.getRecord(key, 'regos')
      .then(
        function fullfilled(result) {
          for (var child of result.child) {
            if (child.firstName == name) {
              child.colour = colour;
              db.updateRecord(key,result,'regos')
              .then(
                function fullfilled(result) {
                  resolve(result);
                },
                function rejected(reason) {
                  reject(reason);
                }
              );
            }
          }
        },
        function rejected(reason) {
          resolve(reason);
        }
      );
    });
  }
};
