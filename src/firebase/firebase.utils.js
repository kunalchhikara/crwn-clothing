import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { userRef } from 'react';

const config = {
    apiKey: "AIzaSyCbDM6Yc0slpNjmM7aNXdtPbsFDQiGX7cs",
    authDomain: "crwn-clothing-project-60f8a.firebaseapp.com",
    databaseURL: "https://crwn-clothing-project-60f8a.firebaseio.com",
    projectId: "crwn-clothing-project-60f8a",
    storageBucket: "crwn-clothing-project-60f8a.appspot.com",
    messagingSenderId: "1065832227445",
    appId: "1:1065832227445:web:6ac7f15974e316198c4e3c",
    measurementId: "G-N1D7E6TV86"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});

  export const signInWithGoogle = () => (
      auth.signInWithPopup(provider)
  );

    export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
        
        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();
        
        if(!snapShot.exists) {
          const {displayName,email} = userAuth;
          const createdAt = new Date();

          try{
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          } catch (error){
              console.log('error creating user', error.message);
        }
    };

            return userRef;

  }

  export default firebase;