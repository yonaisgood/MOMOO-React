import { ref, deleteObject } from 'firebase/storage';

import { storage } from './firebase/config.ts';

async function deleteImg(url: string) {
  const imgRef = ref(storage, url);

  await deleteObject(imgRef);
}

export { deleteImg };
