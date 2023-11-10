import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { appFireStore } from '../../firebase/config';
import { User } from 'firebase/auth';

const GetAccordionData = async (user: User) => {
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

  const albumDocRef = collection(appFireStore, user.uid, user.uid, 'album');
  const orderedAlbums = query(albumDocRef, orderBy('createdTime'));

  // 해당 문서의 데이터 가져오기
  const querySnapshot = await getDocs(orderedAlbums);
  querySnapshot.forEach((doc) => {
    accordionData[0].answer.push(doc.data().name);
  });

  return accordionData;
};

export default GetAccordionData;
