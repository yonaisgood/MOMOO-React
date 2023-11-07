import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

const uploadImageToStorage = async (files: FileList, folderName: string) => {
  const storage = getStorage();
  const downloadURLs: string[] = [];
  const uploadPromises = Array.from(files).map((file) => {
    const storageRef = ref(storage, `${folderName}/${file}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('이미지 업로드 오류:', error);
          reject(error);
        },
        async () => {
          try {
            // 업로드가 성공하면 다운로드 URL을 가져오고, resolve로 반환
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            downloadURLs.push(downloadURL);

            resolve(undefined);
          } catch (error) {
            console.error('다운로드 URL 가져오기 오류:', error);
            reject(error);
          }
        },
      );
    });
  });

  // 모든 Promise를 기다림
  await Promise.all(uploadPromises);

  return downloadURLs;
};

export default uploadImageToStorage;
