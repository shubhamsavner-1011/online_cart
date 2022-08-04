
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk56fGvJI4O4si8GR4kIrPHecRST2c2NU",
  authDomain: "online-cart-217ee.firebaseapp.com",
  projectId: "online-cart-217ee",
  storageBucket: "online-cart-217ee.appspot.com",
  messagingSenderId: "1063569593468",
  appId: "1:1063569593468:web:be00f03165e27da2a265f9",
  measurementId: "G-4J3980N9S9"
};



const storage = getStorage();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

console.log(db,'database')

export {app,auth,db,storage} 

















  

