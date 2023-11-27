import { useState } from 'react';
import { deleteUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { ref, listAll, deleteObject } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import { appAuth, appFireStore, storage } from '../firebase/config';
import { deleteImg } from '../SDKUtiles';

export default function useDeleteId() {
  const [error, setError] = useState<null | string>(null);

  const deleteId = async () => {
    const user = appAuth.currentUser;

    if (!user) {
      return;
    }

    const photoURL = user.photoURL;
    const uid = user.uid;

    try {
      await deleteUser(user);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
        return;
      }
    }

    if (photoURL) {
      deleteImg(photoURL);
    }

    await deleteFeedsImg(uid);
    await deleteUserDocs(uid);
  };

  return { deleteId, error };
}

async function deleteFeedsImg(uid: string) {
  const listRef = ref(storage, `feed/${uid}`);

  const res = await listAll(listRef);
  res.items.forEach((itemRef) => deleteObject(itemRef));
}

async function deleteUserDocs(uid: string) {
  const feedList = await getDocs(collection(appFireStore, uid, uid, 'feed'));
  feedList.forEach((feedDoc) =>
    deleteDoc(doc(appFireStore, uid, uid, 'feed', feedDoc.id)),
  );

  const albumList = await getDocs(collection(appFireStore, uid, uid, 'album'));
  albumList.forEach((albumDoc) =>
    deleteDoc(doc(appFireStore, uid, uid, 'album', albumDoc.id)),
  );
}
