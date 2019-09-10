import firebase from 'firebase'

const config = /*FIREBASECONFIG*/

  firebase.initializeApp(config);

  function searchFamily(search, handler) {
    // use for local dev
    //firebase.functions().useFunctionsEmulator("http://localhost:8010");
    var callable = firebase.functions().httpsCallable('api/searchfamily');
    callable(search)
    .then((result) => handler(result.data));
}

function addFamily(familyState, handler, error) {
  // use for local dev
  //firebase.functions().useFunctionsEmulator("http://localhost:8010");
  var callable = firebase.functions().httpsCallable('api/addfamily');
  callable(familyState)
  .then((response) => handler(response.data))
  .catch((message) => error(message))
}

export {
  searchFamily,
  addFamily
}
