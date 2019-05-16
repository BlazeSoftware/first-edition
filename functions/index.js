const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://blaze-typd.firebaseio.com',
});

const store = admin.firestore();
store.settings({ timestampsInSnapshots: true });

const analyticsApi = require('./analytics')(store);
const contactApi = require('./contact')();

exports.contact = functions.https.onRequest(contactApi);
exports.analytics = functions.https.onRequest(analyticsApi);
