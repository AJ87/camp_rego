'use strict';
var email_sender = require('./email.js');
var db = require('./database.js');

function emailer(rego,list) {
  if (rego) {
    var children = rego.child;
    if (rego.waitlist == false &&
        rego.recordYear == 2018) {

      email_sender.send_pre_smad_email(
        {email:rego.parent1.email,
         name:rego.parent1.firstName,
         children:rego.child})
      .then(
        function fullfilled(result) {
          // continue to next record
          var next_rego = list[0];
          var new_list = list.slice();
          new_list.shift();
          emailer(next_rego,new_list);
        },
        function rejected(reason) {
          // stop processing
          console.log(reason);
        }
      );

    } else {
      // continue to next record
      var next_rego = list[0];
      var new_list = list.slice();
      new_list.shift();
      emailer(next_rego,new_list);
    }
  } else {
    console.log('Finished Processing');
    process.exit(0);
  }
}

// get records from db
var call = function() {
  db.getCollection(null,'regos')
  .then(
    function fullfilled(result) {
      var next_rego = result[0];
      var new_list = result.slice();
      new_list.shift();
      emailer(next_rego,new_list);
    },
    function rejected(reason) {
      console.log(`Could not get regos: ${reason}`);
    }
  );
}

db.initialise()
.then(
  function fullfilled(result) {
    email_sender.initialise(db);
    // put in a wait so email.js will have password before we call below
    setTimeout(call, 2000);
  },
  function rejected(reason) {
    console.log(`Could not initialise DB: ${reason}`);
  }
)
