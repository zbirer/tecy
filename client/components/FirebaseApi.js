import firebase from 'firebase'

const config = {
  "type": "service_account",
  "projectId": "families-hosting",
  "private_key_id": "e4d887a66fdf02a74a0a9cc015ef0222acb643d5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCu3aikrZcJG0ku\ni0nZ4y/B0sHKt9jTDuXNRXWwDbNPpcVcIZTE2HgjBGynVH9kesaPQ0SHCIDFTgEZ\nBXScA3a5djDCHFmE4hI/bUmWxGZZvHsHMdnZNb8WUI0Y1mLJeuhiPOGjA4XvElI+\nKDU1a2CF6BI+72QxSDATeWHng0Xgg17pm9FsikNkmnWLJc1mwAeODDxFVC/ULzq6\ncFBShAB47CJ9PH76jizQSvxR8dEIQtTY54/OYQnWTK2EXOBqW01E8sEma1RG4fKP\ntGAo5+FlUmveWXgP8zvgthJfSXePz5m4DKxcjaJanSoFGutm83b9TDIGlTdedrl6\nLPslgWqBAgMBAAECggEAGy8CJHeH3zaKrd2hYWnb5rmovqbN4iGSv9JodTHsChmv\nEJ93zRIJuwfZDDoqg6hCbcr7QDKmMgXqTcV3VzmCn1osQkC9+dZbF9kZc4Kclp6i\nUYACaa3dQs7K4G2TddbRgVQNj5XgoEWs21TM0L0ciDSHgZkdbjvWnXBlM+RIXJpN\nj2ApwGt6Tccodrl2117l5Lr6VIP97gH23DMd/w3UlwjU760ZlV4t83qwRkYMYYjI\n8XoEwACfgoK6octGVTZIvpj8xlWh2gGdvdGne3MYUo/oK+v6GvrIoP3MfLvwJCuC\npOfbf7fPRhrnr/vK+Ky3BT3Ni5eCKBDvDNT+P1mOMQKBgQDkuty+LdML+S+8qTwv\n8DTa9xa61gVuN2dWaoJjeQhsqN2XVSTUaSKhVfYpkCRyoDDOhuQQqabHbF45UJjA\nyw/bslo69Utw17c2W1NU+EsBnkyTsWJHme5dF+aePNwKXOD1clkgk730lX2gVpya\nerLVQKuLpKbR+gUNqimXxt7+5wKBgQDDtstPInD95WZYCyyEA1ClNiVFixc2jmkW\nts1nuB4cle0TCK6Z6/xlvqmPSlZl9I3+BY0j1EjlXOjL70VGtWQ4degk6jRJj9if\n3/csblynWXXyAtkV89XxFTzfUMCG0457p9ZP/cwvro3aa12TcvG9IIOiBopx3chv\nD1VtgzmmVwKBgQDQWtPIPc/5ITX2Aqd797D+IYTIDzuFKdztYDqESHV/Hdg1CW9y\nOo88LiT9uXsqG3g6ObA46YGuOa4fQabUQGWiuHXvLRFaqnYPguOHDGKvB7cz9qrT\nFIqIrMP8Mu4yVmbpzw8XWN35lc+JJjyjj8+l6LIbk5IOxlSiHPakdpkd0wKBgQCP\n0ugLanMAkjEoqGV5SfpcvrKbLYDMjdD6aTH/c5VlSmQjJbEx2fLsTjXK4EUnvZUP\nRMMYvmsnaqSFIXuWX7ybpUIIxrfQC06VBoBc/WlHbf238JHZiQwCk6ndLjmdmyBN\nDOT4ebkwnSUPivEEZ2bwplE1o3rf/KzLuMf9p36ZFwKBgElwOWCa0f4ujEKq+j/E\nwmGD+hZmdKqNwCkZ0axdwQzPWo/B7M9alIV1MKxpVG6Z5I4fh3Jh4SZSfiwpGTxo\nNulTWOnoTexO31qii9EU1dw4cwNmnGDWr6qe8aeK2mB+qdrNsBkPWqi8Qz4m0ZO2\nh6NilSrzpy8iFqiQtf7/ZsSd\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ma98j@families-hosting.iam.gserviceaccount.com",
  "client_id": "111797172141072681105",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ma98j%40families-hosting.iam.gserviceaccount.com"
 }

  firebase.initializeApp(config);

  function searchFamily(search, handler) {
    // use for local dev
    firebase.functions().useFunctionsEmulator("http://localhost:8010");
    var callable = firebase.functions().httpsCallable('api/searchfamily');
    callable(search)
    .then((result) => handler(result.data));
}

function addFamily(familyState, handler, error) {
  // use for local dev
  firebase.functions().useFunctionsEmulator("http://localhost:8010");
  var callable = firebase.functions().httpsCallable('api/addfamily');
  callable(familyState)
  .then((response) => handler(response.data))
  .catch((message) => error(message))
}

export {
  searchFamily,
  addFamily
}
