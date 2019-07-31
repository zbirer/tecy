const check = require('express-validator/check');

// Enum representation of the 7 districs of israel, taken from: https://en.wikipedia.org/wiki/Districts_of_Israel
// CLDR only offers 6 districts. https://unicode.org/cldr/charts/latest/supplemental/territory_subdivisions.html
const regionsEnum = [
  'NORTHERN', 'SOUTHERN', 'TEL-AVIV', 'CENTRAL', 'HAIFA', 'JERUSALEM', 'JUDEA',
];

const foodEnum = [
  'KOSHER'
]

const baseBody = [
  check.body('name').exists(),
  check.body('address').exists(),
  check.body('kosher').isBoolean(),
  check.body('vegeterian').isBoolean(),
  check.body('capacity_adults').isInt({
    gt: 0,
  }),
  check.body('capacity_kids').isInt(),
];

const familyCreate = [...baseBody,
  check.body('phone_number').isLength({
    min: 9,
    max: 13,
  }).isNumeric(),
];

const familyUpdate = [...baseBody, check.header('token').exists()];


module.exports = {
  familyCreate,
  familyUpdate,
};
