import firebase, { store } from '@/firebase/firebase';

export default async (user, password) => {
  const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
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
  await user.delete();
  await firebase.auth().signOut();
};
