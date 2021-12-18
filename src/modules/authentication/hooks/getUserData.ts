import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from 'modules/redux-store';

export const getDataFromUser = async (user: User) => {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('id', '==', user.uid));
  const querySnapshot = await getDocs(q);
  const dataFromFirestore: string[] = [];
  if (querySnapshot.docs.length === 1) {
    querySnapshot.docs.map((res) => {
      dataFromFirestore.push(res.data().userPhoto, res.data().displayName);
    });
  }
  const photoUrl = dataFromFirestore[0];
  const displayName = dataFromFirestore[1];
  return { displayName, photoUrl };
};
