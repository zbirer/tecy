/* eslint-disable require-jsdoc */
const check = require('express-validator/check');

// Enum representation of the 7 districs of israel, taken from: https://en.wikipedia.org/wiki/Districts_of_Israel
// CLDR only offers 6 districts. https://unicode.org/cldr/charts/latest/supplemental/territory_subdivisions.html
const regionsEnum = [
  'NORTHERN', 'SOUTHERN', 'TEL-AVIV', 'CENTRAL', 'HAIFA', 'JERUSALEM', 'JUDEA',
];

const baseBody = [
  check.body('name').exists(),
  check.body('address').exists(),
  check.body('region').isIn(regionsEnum),
  check.body('capacity').isInt({
    gt: 0,
  }),
  check.body('is_host').isBoolean(),
];

function familyCreate() {
  return [...baseBody,
    check.body('email').isEmail(),
    check.body('phone_number').isLength({
      min: 9,
      max: 13,
    }).isNumeric(),
  ];
}

function familyUpdate() {
  return [...baseBody, check.header('token').exists()];
};

module.exports = {
  familyCreate,
  familyUpdate,
};
