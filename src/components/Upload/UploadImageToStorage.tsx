import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

const uploadImageToStorage = async (file: File, folderName: string) => {
  const storage = getStorage();
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
        reject(error); // 업로드 중 에러가 발생하면 reject를 호출
      },
      async () => {
        try {
          // 업로드가 성공하면 다운로드 URL을 가져오고, resolve로 반환
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error('다운로드 URL 가져오기 오류:', error);
          reject(error); // 다운로드 URL 가져오기 중 에러가 발생하면 reject를 호출
        }
      },
    );
  });
};

export default uploadImageToStorage;
