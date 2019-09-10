import firebase from 'firebase'

const config = {
    "projectId": "families-hosting",
    "appId": "1:175187365155:web:638b6ebd4e3f8871",
    "databaseURL": "https://families-hosting.firebaseio.com",
    "storageBucket": "families-hosting.appspot.com",
    "locationId": "europe-west",
    "apiKey": "AIzaSyCRrVHLqoQRHM8wX5VaBdwtWID2cYFXTdM",
    "authDomain": "families-hosting.firebaseapp.com",
    "messagingSenderId": "175187365155"
  }

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