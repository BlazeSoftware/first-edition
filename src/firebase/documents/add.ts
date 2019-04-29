import firebase, { store } from '@/firebase/firebase';

export default async (user) => {
  const docRef = await store.collection('documents').add({
    owner: user.uid,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

  store
    .collection('bodies')
    .doc(docRef.id)
    .set({
      owner: user.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
