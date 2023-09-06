import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFV28uGR7TjIi4sa6gqYxmPQI_tMS4MK0",
  authDomain: "cinemate-83ca8.firebaseapp.com",
  projectId: "cinemate-83ca8",
  storageBucket: "cinemate-83ca8.appspot.com",
  messagingSenderId: "1007094090949",
  appId: "1:1007094090949:web:7a757d06a34ff3d79ff4ac"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;