// 이미지 한 장 업로드
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/config.ts';

export default async function useUploadImg(path: string, file: File) {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  return downloadURL;
}
