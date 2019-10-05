const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {validationResult} = require('express-validator/check');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });
    }

    const familyToCreate = req.body.data;
    if (await utils.userExists(familiesCollection, familyToCreate.phone_number)) {
      res.status(409).json({
        data: {
          status: "exists"
        }
      }).send();
    } else {
      await familiesCollection.add({
        'name': familyToCreate.name,
        'address': familyToCreate.address,
        'phone_number': familyToCreate.phone_number,
        'kosher': familyToCreate.kosher ? true : false,
        'vegetarian': familyToCreate.vegetarian ? true : false,
        'capacity_kids': parseInt(familyToCreate.capacity_kids),
        'capacity_adults': parseInt(familyToCreate.capacity_adults),
      });
      res.status(201).json({
        data: {
          status: "created"
        }
      }).send();
    }
  });

router.post('/searchfamily', async (req, res) => {
  let { adults, children, isKosher, isVeg } = req.body.data;
  let dbSnapshot = await familiesCollection
    .orderBy("capacity_adults")
    .where("capacity_adults", ">=", adults)
    .limit(50)
    .get();
  families = dbSnapshot.docs.map((doc) => doc.data());
  families = families.filter(family => {
    valid = (family.capacity_kids >= children);
    if (isKosher) valid &= family.kosher;
    if (isVeg) valid &= family.vegetarian;
    return valid;
  }
  );
  res.send({
    data: families
  });
})

//For now this is outdated... please don't use this endpoint.
router.post('/editfamily/', validators.familyUpdate,
  async (req, res) => {
    const errors = validationResult(req);
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
