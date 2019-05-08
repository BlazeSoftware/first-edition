import firebase, { store } from '@/firebase/firebase';

export default async (user, password) => {
  const providerId = user.providerData[0].providerId;
  const socialLogin = ['twitter.com', 'facebook.com'].includes(providerId);
  let credentials;

  if (socialLogin) {
    const creds = await store
      .collection('credentials')
      .doc(user.uid)
      .get();

    if (providerId === 'twitter.com') {
      credentials = firebase.auth.TwitterAuthProvider.credential(creds.data().token, creds.data().secret);
    }

    if (providerId === 'facebook.com') {
      credentials = firebase.auth.FacebookAuthProvider.credential(creds.data().token);
    }
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

  if (socialLogin) {
    await store
      .collection('credentials')
      .doc(user.uid)
      .delete();
  }

  await user.delete();
  await firebase.auth().signOut();
};
