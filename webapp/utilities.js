var json2csv = require('json2csv');

const fields =
  ['parent1.id','parent1.firstName','parent1.lastName','parent1.mobile','parent1.email','parent1.address',
   'parent2.firstName','parent2.lastName','parent2.mobile','parent2.email',
   'consent.terms','consent.firstAid','consent.privacy','consent.refund','waitlist'
  ];

  const heading = '"ID","First Name","Last Name","Mobile","Email","Address","First Name","Last Name","Mobile","Email",' +
     '"Terms","First Aid","Privacy","Refund","Waitlist"\n';

  const childFields =
    ['id','firstName','lastName','birthdate','gender','school','year','friend','shirt',
     'medicare1','medicare2','asthma','epipen','allergy-egg','allergy-nuts',
     'allergy-gluten','allergy-lactose','allergy-other','medication-yes','medicalInfo','waitlist'];

  const childHeading = '"ID","First Name","Last Name","Birthdate","Gender","School","Year","Friend","Shirt Size",' +
      '"Medicare Number","Medicare No. on Card","Asthma","Epipen","Egg","Nuts","Gluten","Lactose","Other","Medication","Extra","Waitlist"\n';

  const colourGroupFields =
    ['id','firstName','lastName','year','school','shirt','asthma','epipen','allergy-egg','allergy-nuts',
    'allergy-gluten','allergy-lactose','allergy-other','medication-yes','medicalInfo'];

  const colourHeading = '"ID","First Name","Last Name","Year","School","Shirt Size","Asthma","Epipen","Egg","Nuts","Gluten","Lactose","Other","Medication","Extra"\n';

function convert(json) {
  return new Promise( function pr(resolve,reject) {
    var data = json2csv({
      data: json,
      fields: fields,
      hasCSVColumnTitle: false
    });

    if (data) {
      data = heading + data;
      resolve(data);
    } else {
      reject('No csv');
    };
  });
}

function convertChild(json) {
  return new Promise( function pr(resolve,reject) {
    var data = json2csv({
      data: json,
      fields: childFields,
      hasCSVColumnTitle: false
    });

    if (data) {
      data = childHeading + data;
      resolve(data);
    } else {
      reject('No csv');
    };
  });
}

function convertColourGroup(json) {
  return new Promise( function pr(resolve,reject) {
    var data = json2csv({
      data: json,
      fields: colourGroupFields,
      hasCSVColumnTitle: false
    });

    if (data) {
      data = colourHeading + data;
      resolve(data);
    } else {
      reject('No csv');
    };
  });
}

var utility = {
  convert: convert,
  convertChild: convertChild,
  convertColourGroup: convertColourGroup
};

module.exports = utility;
