import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAFuCsaIuUnGv_qgrPmewSdI4m3G1s8GII",
    authDomain: "clone-c6383.firebaseapp.com",
    databaseURL: "https://clone-c6383.firebaseio.com",
    projectId: "clone-c6383",
    storageBucket: "clone-c6383.appspot.com",
    messagingSenderId: "923288419915",
    appId: "1:923288419915:web:3463678894833857bdd7ce",
    measurementId: "G-WRBSKC2BBE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth();

export { db, auth }