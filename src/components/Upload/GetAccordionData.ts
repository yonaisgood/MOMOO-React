import { appFireStore } from '../../firebase/config';
import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import useAuthContext from '../../hooks/useAuthContext';

import SunnyImg from '../../asset/image/Sunny.svg';
import PartlySunnyImg from '../../asset/image/PartlySunny.svg';
import CloudyImg from '../../asset/image/Cloudy.svg';
import RainyImg from '../../asset/image/Rainy.svg';
import SnowyImg from '../../asset/image/Snowy.svg';
import ExcitedImg from '../../asset/image/Excited.svg';
import SmilingImg from '../../asset/image/Smiling.svg';
import YummyImg from '../../asset/image/Yummy.svg';
import FrowningImg from '../../asset/image/Frowning.svg';
import SadImg from '../../asset/image/Sad.svg';
import AngryImg from '../../asset/image/Angry.svg';

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
        answer: [SunnyImg, PartlySunnyImg, CloudyImg, RainyImg, SnowyImg],
      },
      {
        question: '오늘의 기분',
        answer: [
          ExcitedImg,
          SmilingImg,
          YummyImg,
          FrowningImg,
          SadImg,
          AngryImg,
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
