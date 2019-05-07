import firebase, { store } from '@/firebase/firebase';

export default async (user, password) => {
  const socialLogin = ['twitter.com'].includes(user.providerData[0].providerId);
  let credentials;

  if (socialLogin) {
    const creds = await store
      .collection('credentials')
      .doc(user.uid)
      .get();
    credentials = firebase.auth.TwitterAuthProvider.credential(creds.data().token, creds.data().secret);
  } else {
    credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
  }

  await user.reauthenticateAndRetrieveDataWithCredential(credentials);

  const documentsSnapshot = await store
    .collection('documents')
    .where('owner', '==', user.uid)
    .get();

  const batch = store.batch();
  documentsSnapshot.forEach((f) => {
    batch.delete(f.ref);
  });
  await batch.commit();

  await store
    .collection('credentials')
    .doc(user.uid)
    .delete();

  await user.delete();
  await firebase.auth().signOut();
};
