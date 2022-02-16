import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
  apiKey: "AIzaSyDKlxI5_qjhWh9ls4YdPqXbC_lmked9oz4",
  authDomain: "tarefasapp-d5caf.firebaseapp.com",
  projectId: "tarefasapp-d5caf",
  storageBucket: "tarefasapp-d5caf.appspot.com",
  messagingSenderId: "923765170580",
  appId: "1:923765170580:web:8b827f20a1f7b30e3daf81"
}

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase