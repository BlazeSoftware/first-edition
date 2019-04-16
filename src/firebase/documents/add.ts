import firebase, { store } from '@/firebase/firebase';

export default async (user, { title }) => {
  await store
    .collection('documents')
    .doc()
    .set({
      title,
      owner: user.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
