import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCQMjWYP3lbcewk1dz5IGSdm9x4RxAJIKs",
    authDomain: "story-hub-44237.firebaseapp.com",
    projectId: "story-hub-44237",
    storageBucket: "story-hub-44237.appspot.com",
    messagingSenderId: "932203526090",
    appId: "1:932203526090:web:9943ff9d722e16db324133"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();