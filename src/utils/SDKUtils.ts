import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

import { storage } from '../firebase/config.ts';

async function deleteImg(url: string) {
  const imgRef = ref(storage, url);

  await deleteObject(imgRef);
}

async function uploadImg(path: string, file: File) {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  return downloadURL;
}

export { deleteImg, uploadImg };
