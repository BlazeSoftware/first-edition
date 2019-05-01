import firebase, { store } from '@/firebase/firebase';

export default async (user) => {
  await store.collection('documents').add({
    owner: user.uid,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
