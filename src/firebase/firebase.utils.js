import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBxUiHsFZawwXQocI2VxE5QUsgKNQYmLps",
  authDomain: "crwn-db-b57d0.firebaseapp.com",
  databaseURL: "https://crwn-db-b57d0.firebaseio.com",
  projectId: "crwn-db-b57d0",
  storageBucket: "crwn-db-b57d0.appspot.com",
  messagingSenderId: "322537820028",
  appId: "1:322537820028:web:2dd0f344cf191d149c5ef9",
  measurementId: "G-66S0KD452Z",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;