import { SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { appFireStore, Timestamp } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

import { useAddFeedIdFromFeedList } from '../hooks/useUpdateFeedList';
import useUploadContext from '../hooks/useUploadContext';
import useAuthContext from '../hooks/useAuthContext';

import Accordion from '../components/Accordion/Accordion';
import GetAccordionData from '../components/Upload/GetAccordionData';
import MultipleAccordion from '../components/Accordion/MultipleAccordion';
import Preview from '../components/FileUpload/Preview';
import uploadImageToStorage from '../components/Upload/UploadImageToStorage';
import KakaoMap from '../components/Map/KakaoMap';
import * as Styled from '../components/Upload/Upload/StyledUpload';

import Arrow from '../asset/icon/Arrow.svg';
import CloseMobileIcon from '../asset/icon/X-Small.svg';

interface Object {
  question: string;
  answer: string[];
}

interface AlbumIdData {
  albumName: string;
  docId: string;
}

export default function Upload() {
  const { user } = useAuthContext();
  const { albumNameListToAdd } = useUploadContext();

  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [selectedAlbum, setSelectedAlbum] =
    useState<string[]>(albumNameListToAdd);
  const [file, setFile] = useState<FileList | null>(null);
  const [accordionData, setAccordionData] = useState<Object[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);

  const getAccordionData = GetAccordionData();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await getAccordionData();
        setAccordionData(result.accordionData || []);
        setAlbumIdData(result.albumIdData || []);
      }
    };

    fetchData();
  }, []);

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    try {
      if (user) {
        const id = uuidv4();
        const userDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

        if (file === null) {
          alert('사진을 선택해주세요');
          return;
        }

        const downloadURLs = await uploadImageToStorage(
          file,
          `feed/${user.uid}`,
          id,
        );

        const uploadData = {
          title: title,
          text: text,
          timestamp: Timestamp.now(),
          selectedAddress: selectedAddress,
          weatherImage: selectedWeatherImage,
          emotionImage: selectedEmotionImage,
          album: selectedAlbum,
          imageUrl: downloadURLs,
          id: id,
        };

        await setDoc(userDocRef, uploadData);
        navigate(`/feed/${id}`);

        try {
          selectedAlbum.forEach(async (album) => {
            let selectedAlbumId = '';
            for (const iterator of albumIdData) {
              if (album === iterator.albumName) {
                selectedAlbumId = iterator.docId;
              }
            }

            await addFeedIdFromFeedList(id, selectedAlbumId);
          });
        } catch (error) {
          console.error(
            '앨범 데이터를 업데이트하는 중 오류가 발생했습니다.',
            error,
          );
        }
      } else {
        console.error('사용자가 로그인되지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Styled.UploadWrapper>
        <h2 className="a11y-hidden">새 게시물 업로드</h2>
        <Styled.UploadHeader>
          <Styled.MobileCloseBtn onClick={() => navigate(-1)}>
            <img src={CloseMobileIcon} alt="닫기" />
          </Styled.MobileCloseBtn>
          <h2>새 게시물</h2>
          <button className="uploadBtn" type="button" onClick={handleSubmit}>
            업로드
          </button>
        </Styled.UploadHeader>
        <Styled.UploadContents>
          <Styled.PicPart>
            <Preview setFile={setFile} />
          </Styled.PicPart>
          <Styled.SelectPart>
            <div className="inputWrapper">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <form className="uploadInfo">
              <textarea
                id="uploadText"
                maxLength={1000}
                cols={30}
                rows={10}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder="문구를 입력해주세요..."
              ></textarea>
            </form>
            <Styled.LocationContents onClick={toggleKakaoMap}>
              <div className="locationHead">
                {selectedAddress ? (
                  <p>선택한 주소: {selectedAddress}</p>
                ) : (
                  <h2>위치 추가</h2>
                )}
                <img
                  className={kakaoMapVisible ? 'rotate' : ''}
                  src={Arrow}
                  alt="위치토글아이콘"
                />
              </div>
            </Styled.LocationContents>
            {kakaoMapVisible && (
              <Styled.KakaoMapContainer>
                <KakaoMap
                  onAddressSelect={(address) => handleAddressSelect(address)}
                />
              </Styled.KakaoMapContainer>
            )}
            <Styled.AccordionContents>
              {accordionData.slice(1, 2).map(() => (
                <MultipleAccordion
                  key={0}
                  question={accordionData[0].question}
                  answer={accordionData[0].answer.join(',')}
                  selectedAlbum={selectedAlbum}
                  setSelectedAlbum={setSelectedAlbum}
                />
              ))}
              {accordionData.slice(1, 3).map((data, index) => (
                <Accordion
                  key={index}
                  question={data.question}
                  answer={data.answer.join(',')}
                  selectedImages={
                    data.question === '오늘의 날씨'
                      ? selectedWeatherImage
                      : selectedEmotionImage
                  }
                  setSelectedImages={
                    data.question === '오늘의 날씨'
                      ? setSelectedWeatherImage
                      : setSelectedEmotionImage
                  }
                />
              ))}
            </Styled.AccordionContents>
          </Styled.SelectPart>
        </Styled.UploadContents>
      </Styled.UploadWrapper>
    </>
  );
}
