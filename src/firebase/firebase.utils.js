import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA_nwT4P_Z7bOycMkBgLkXjvSDILEblIGM",
  authDomain: "udemy-ecommerce-db-7e990.firebaseapp.com",
  databaseURL: "https://udemy-ecommerce-db-7e990.firebaseio.com",
  projectId: "udemy-ecommerce-db-7e990",
  storageBucket: "udemy-ecommerce-db-7e990.appspot.com",
  messagingSenderId: "661815857443",
  appId: "1:661815857443:web:4c36cbe8604fc347f87c96",
  measurementId: "G-10T9QRE8H6"
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
