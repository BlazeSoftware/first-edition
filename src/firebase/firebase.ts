import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCo4HY4Kz2ZHFZ10pbx28Mw1NlnNB1VKPE',
  authDomain: 'blaze-first-edition.firebaseapp.com',
  databaseURL: 'https://blaze-first-edition.firebaseio.com',
  projectId: 'blaze-first-edition',
  storageBucket: 'blaze-first-edition.appspot.com',
  messagingSenderId: '107279226412',
};

firebase.initializeApp(config);

const store = firebase.firestore();

export { store };
export default firebase;
