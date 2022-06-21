import firebase from "firebase";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDm2QG1WWCmkBvdmWtY_DzAcM3To7AtG04",
    authDomain: "payments-monitor-personal.firebaseapp.com",
    projectId: "payments-monitor-personal",
    storageBucket: "payments-monitor-personal.appspot.com",
    messagingSenderId: "98253273991",
    appId: "1:98253273991:web:1dea3654821313ddb9f122",
    measurementId: "G-FSEEQQ33ZZ"
};

firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()

export default firebase