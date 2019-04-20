var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var check = require('express-validator/check');

var serviceAccount = require('../resources/creds.json');
var validators = require('../middleware/validators');
var utils = require('../utils');

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

router.post('/addfamily/', validators.familyCreate(), async (req, res, next) => {
    const errors = check.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        });
    }

    if (await utils.userExists(familiesCollection, req.body.phone_number, req.body.email)) {
        res.status(409).send();
    } else {
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
    }
})

router.post("/editfamily/", validators.familyUpdate(), async (req, res, next) => {
    const errors = check.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        });
    }

    await familiesCollection.doc(req.headers.token).update({
        'name': req.body.name,
        'address': req.body.address,
        'region': req.body.region,
        'capacity': req.body.capacity,
        'is_host': req.body.is_host,
    });
    res.status(200).send();

})

module.exports = router;