import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAH6MArr7y8imivmrSQlvlJtFXKi0pAFYQ",
  authDomain: "online-cart-a6a55.firebaseapp.com",
  projectId: "online-cart-a6a55",
  storageBucket: "online-cart-a6a55.appspot.com",
  messagingSenderId: "886771281089",
  appId: "1:886771281089:web:50c11e6b8c38c7467f3840",
  measurementId: "G-4P7VRZ1HXZ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {app,auth} 
