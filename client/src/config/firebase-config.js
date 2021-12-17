import { initializeApp } from "firebase/app";
require('dotenv').config();

const firebaseconf={
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
} 
const app = initializeApp(firebaseconf);  
/*//export default data
exports = {
    firebaseconf: firebaseconf,
    app: app
} */
export {
    firebaseconf,
    app
};