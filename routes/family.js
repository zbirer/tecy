const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const check = require('express-validator/check');

const serviceAccount = require('../resources/creds.json');
const validators = require('../middleware/validators');
const utils = require('../utils');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const familiesCollection = db.collection('families');

router.get('/', async (req, res) => {
  let snapshot;
  if (req.query.region) {
    snapshot = await familiesCollection
        .where('region', '==', req.query.region).get();
  } else {
    snapshot = await familiesCollection.get();
  }
  res.send(snapshot.docs.map((doc) => doc.data()));
});

router.post('/addfamily/', validators.familyCreate,
    async (req, res) => {
      const errors = check.validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({
          errors: errors.array(),
        });
      }

      if (await utils.userExists(
          familiesCollection, req.body.phone_number, req.body.email)) {
        res.status(409).send();
      } else {
        await familiesCollection.add({
          'name': req.body.name,
          'address': req.body.address,
          'phone_number': req.body.phone_number,
          'kosher': req.body.kosher,
          'vegetarian': req.body.vegetarian,
          'capacity_kids': req.body.capacity_kids,
          'capacity_adults': req.body.capacity_adults,
        });
        res.status(201).send();
      }
    });

router.post('/editfamily/', validators.familyUpdate,
    async (req, res) => {
      const errors = check.validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({
          errors: errors.array(),
        });
      }

      // We use a "Token" here to mock the behaviour of authentication.
      await familiesCollection.doc(req.headers.token).update({
        'name': req.body.name,
        'address': req.body.address,
        'region': req.body.region,
        'capacity': req.body.capacity,
        'is_host': req.body.is_host,
      });
      res.status(200).send();
    });

module.exports = router;
