import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDiQBjPtuT_Wog1vZW1-Y_aCsdkX48mRwo',
  authDomain: 'blaze-typd.firebaseapp.com',
  databaseURL: 'https://blaze-typd.firebaseio.com',
  projectId: 'blaze-typd',
  storageBucket: 'blaze-typd.appspot.com',
  messagingSenderId: '1046895766412',
};

firebase.initializeApp(config);

const store = firebase.firestore();

export { store };
export default firebase;
