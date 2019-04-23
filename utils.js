/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
async function userExists(collection, phone, email) {
  // Two unique fields, checked for existance.
  // There is no way in firebase to do a logical OR operation.
  // https://firebase.google.com/docs/firestore/query-data/queries

  const emailDoc = await collection
      .where('email', '==', email.toLowerCase()).get();
  const numberDoc = await collection.where('phone_number', '==', phone).get();

  if (!emailDoc.empty | !numberDoc.empty) {
    return true;
  }
  return false;
}

module.exports = {
  userExists,
};
