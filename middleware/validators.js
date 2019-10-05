const {header, body} = require('express-validator/check');

// Enum representation of the 7 districs of israel, taken from: https://en.wikipedia.org/wiki/Districts_of_Israel
// CLDR only offers 6 districts. https://unicode.org/cldr/charts/latest/supplemental/territory_subdivisions.html
const regionsEnum = [
  'NORTHERN', 'SOUTHERN', 'TEL-AVIV', 'CENTRAL', 'HAIFA', 'JERUSALEM', 'JUDEA',
];

const baseBody = [
  body('data.name').exists(),
  body('data.address').exists(),
  body('data.kosher').isBoolean().optional(),
  body('data.vegeterian').isBoolean().optional(),
  body('data.capacity_adults').isInt({
    gt: 0,
  }),
  body('data.capacity_kids').isInt(),
];

const familyCreate = [...baseBody,
  body('data.phone_number').isLength({
    min: 9,
    max: 13,
  }).isNumeric(),
];

const familySearch = [
  body('data.adults').isNumeric(),
  body('data.children').isNumeric(),
  body('data.isKosher').isBoolean(),
  body('data.isVeg').isBoolean()
];

const familyUpdate = [...baseBody, header('token').exists()];

module.exports = {
  familySearch,
  familyCreate,
  familyUpdate,
};
