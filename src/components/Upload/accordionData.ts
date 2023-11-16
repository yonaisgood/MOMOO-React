import useGetAlbumList from '../../hooks/useGetAlbumList';

const GetAccordionData = () => {
  const { albumDataList, albumIdList } = useGetAlbumList();

  const getAccordionData = async () => {
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

    return { accordionData, albumIdData };
  };

  return getAccordionData;
};

export default GetAccordionData;
