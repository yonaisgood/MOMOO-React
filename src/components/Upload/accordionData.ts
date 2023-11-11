import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { appFireStore } from '../../firebase/config';
import { User } from 'firebase/auth';
import useGetAlbumList from '../../hooks/useGetAlbumList';

const GetAccordionData = async (user: User) => {
  const getAlbumList = useGetAlbumList();

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
  const albumsQuerySnapshot = await getAlbumList();

  if (!albumsQuerySnapshot) {
    return;
  }

  albumsQuerySnapshot.forEach((doc) => {
    accordionData[0].answer.push(doc.data().name);
    albumIdData.push({ albumName: doc.data().name, docId: doc.id });
  });

  return { accordionData, albumIdData };
};

export default GetAccordionData;
