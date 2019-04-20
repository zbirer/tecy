var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var familyCreateValidator = require('../middleware/family-create');

var check = require('express-validator/check');

var serviceAccount = require('../resources/creds.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
var familiesCollection = db.collection('families');

router.get('/', async (req, res, next) => {
    if (req.query.region) {
        var snapshot = await familiesCollection.where('region', '==', req.query.region).get();
    } else {
        var snapshot = await familiesCollection.get();
    }
    res.send(snapshot.docs.map((doc) => doc.data()));
});

router.post('/addfamily/', familyCreateValidator(), async (req, res, next) => {
    const errors = check.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        });
    }

    // Two unique fields, checked for existance.
    // There is no way in firebase to do a logical OR operation.
    // https://firebase.google.com/docs/firestore/query-data/queries
    var email = await familiesCollection
        .where('email', '==', req.body.email).get();
    var number = await familiesCollection
        .where('phone_number', '==', req.body.phone_number).get();

    if (!email.empty | !number.empty) {
        res.status(409).send();
    }

    await familiesCollection.add({
        'name': req.body.name,
        'address': req.body.address,
        'phone_number': req.body.phone_number,
        'region': req.body.region,
        'capacity': req.body.capacity,
        'is_host': req.body.is_host,
        'email': req.body.email.toLowerCase()
    });
    res.status(201).send();
})

module.exports = router;