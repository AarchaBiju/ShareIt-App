import firebase from 'firebase';
require('@firebase/firestore')

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAO3mdzTYVTqGXqr_58kbvt099M5VWzQ5Q",
    authDomain: "story-hub-bf641.firebaseapp.com",
    projectId: "story-hub-bf641",
    storageBucket: "story-hub-bf641.appspot.com",
    messagingSenderId: "405897068535",
    appId: "1:405897068535:web:de845d47e24a09af18b8f2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();