async function userExists(collection, phone) {
  const numberDoc = await collection.where('phone_number', '==', phone).get();
  return !numberDoc.empty;
}

// TODO: use export default [ES6]

module.exports = {
  userExists,
};
