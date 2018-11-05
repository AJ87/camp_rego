'use strict';
var email_sender = require('./email.js');
var db = require('./database.js');

function emailer(email,list) {
  if (email) {
    email_sender.send_reminder({email:email.email})
    .then(
      function fullfilled(result) {
        // continue to next record
        var email = list[0];
        var new_list = list.slice();
        new_list.shift();
        emailer(email,new_list);
      },
      function rejected(reason) {
        // stop processing
        console.log(reason);
      }
    );
  }
}

// get records from db
var call = function() {
  db.getCollection(null,'emails')
  .then(
    function fullfilled(result) {
      var email = result[0];
      var new_list = result.slice();
      new_list.shift();
      emailer(email,new_list);
    },
    function rejected(reason) {
      console.log(`Could not get emails: ${reason}`);
    }
  );
}

// put in a wait so email.js will have password before we call below
setTimeout(call, 2000);
