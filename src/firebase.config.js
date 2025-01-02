import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAHlxFxRDlTdLXOeaicBVa4leR_7kq33Ak",
    authDomain: "eatup-1dfe8.firebaseapp.com",
    databaseURL: "https://eatup-1dfe8-default-rtdb.firebaseio.com",
    projectId: "eatup-1dfe8",
    storageBucket: "eatup-1dfe8.appspot.com",
    messagingSenderId: "518967912042",
    appId: "1:518967912042:web:542c9b8a3c6044b0c9cc13"
  };

  const app = getApp.length>0?getApp():initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export{ app, firestore, storage };