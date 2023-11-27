import { appFireStore } from '../../firebase/config';
import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import useAuthContext from '../../hooks/useAuthContext';

const GetAccordionData = () => {
  const { user } = useAuthContext();
  
  const getAccordionData = async () => {
    
    const albumDataList: DocumentData[] = [];
    const albumIdList: string[] = [];

    if (user === null) {
      return { albumDataList, albumIdList };
    }

    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        orderBy('createdTime'),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        albumDataList.push({ ...doc.data(), id: doc.id });
        albumIdList.push(doc.id);
      });
    } catch (error) {
      console.log(error);
    }

    const accordionData = [
      {
        question: '앨범 선택',
        answer: [],
      },
      {
        question: '오늘의 날씨',
        answer: [
          '/src/asset/image/Sunny.svg',
          '/src/asset/image/PartlySunny.svg',
          '/src/asset/image/Cloudy.svg',
          '/src/asset/image/Rainy.svg',
          '/src/asset/image/Snowy.svg',
        ],
      },
      {
        question: '오늘의 기분',
        answer: [
          '/src/asset/image/Excited.svg',
          '/src/asset/image/Smiling.svg',
          '/src/asset/image/Yummy.svg',
          '/src/asset/image/Frowning.svg',
          '/src/asset/image/Sad.svg',
          '/src/asset/image/Angry.svg',
        ],
      },
    ];

    interface AlbumIdData {
      albumName: string;
      docId: string;
    }

    const albumIdData: AlbumIdData[] = [];

    albumDataList.forEach((albumData, i) => {
      accordionData[0].answer.push(albumData.name);
      albumIdData.push({
        albumName: albumData.name,
        docId: albumIdList[i],
      });
    });
    console.log(accordionData[0]);

    return { accordionData, albumIdData };
  };

  return getAccordionData;
};

export default GetAccordionData;
