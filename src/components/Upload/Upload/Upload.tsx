import { SyntheticEvent, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { appFireStore, Timestamp } from '../../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

import { useAddFeedIdFromFeedList } from '../../../hooks/useUpdateFeedList';
import useUploadContext from '../../../hooks/useUploadContext';
import useAuthContext from '../../../hooks/useAuthContext';
import useOverlayClose from '../../../hooks/useOverlayClose';

import Accordion from '../../Accordion/Accordion';
import GetAccordionData from '../GetAccordionData';
import MultipleAccordion from '../../Accordion/MultipleAccordion';
import Preview from '../../FileUpload/Preview';
import uploadImageToStorage from '../UploadImageToStorage';
import KakaoMap from '../../Map/KakaoMap';
import * as Styled from './StyledUpload';
import { StyledLoadingImg } from '../../Loading/StyledLodingImg';

import Arrow from '../../../asset/icon/Arrow.svg';
import CloseIcon from '../../../asset/icon/X-White.svg';
import LoadingIcon from '../../../asset/icon/Loading.svg';

interface Object {
  question: string;
  answer: string[];
}

interface AlbumIdData {
  albumName: string;
  docId: string;
}

function Upload() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuthContext();
  const {
    albumNameListToAdd,
    isUploadModalOpen,
    setIsUploadModalOpen,
    setAlbumNameListToAdd,
  } = useUploadContext();

  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  let [inputCount, setInputCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [selectedAlbum, setSelectedAlbum] =
    useState<string[]>(albumNameListToAdd);
  const [file, setFile] = useState<FileList | null>(null);
  const [accordionData, setAccordionData] = useState<Object[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [isPending, setIsPending] = useState(false);

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

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  useEffect(() => {
    if (isUploadModalOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isUploadModalOpen]);

  const closeUploadModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsUploadModalOpen(false);
    setAlbumNameListToAdd(albumNameListToAdd.slice(0, 1));
  };

  useOverlayClose(dialogRef, closeUploadModal);

  // 'ESC' 키 이벤트와 `close` 이벤트 리스너를 추가하여 모달 상태를 동기화
  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => {
      setIsUploadModalOpen(false);
    };

    dialog?.addEventListener('close', handleClose);

    return () => {
      dialog?.removeEventListener('close', handleClose);
    };
  }, [setIsUploadModalOpen]);

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    if (file === null) {
      alert('사진을 선택해주세요');
      return;
    }

    setIsPending(true);

    try {
      if (user) {
        const id = uuidv4();
        const userDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

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
        closeUploadModal();

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

    setIsPending(false);
  };

  return (
    <>
      <Styled.StyledDialog
        className={isPending ? 'loading' : ''}
        ref={dialogRef}
        aria-labelledby="dialog-label"
      >
        <div>
          <h2 className="a11y-hidden">새 게시물 업로드</h2>
          <Styled.UploadHeader>
            <h2>새 게시물</h2>
            <button
              className="uploadBtn"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              업로드
            </button>
          </Styled.UploadHeader>
          <Styled.UploadContents>
            {isPending ? (
              <StyledLoadingImg src={LoadingIcon} alt="로딩중" />
            ) : (
              <>
                <Styled.PicPart>
                  <Preview setFile={setFile} />
                </Styled.PicPart>
                <Styled.SelectPart>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      maxLength={50}
                      placeholder="제목을 입력해주세요 (필수)"
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
                        onInputHandler(e);
                      }}
                      placeholder="문구를 입력해주세요"
                    ></textarea>
                    <div className="countText">
                      <span>{inputCount}</span> / 1000 자
                    </div>
                  </form>
                  <Styled.LocationContents onClick={toggleKakaoMap}>
                    <div className="locationHead">
                      {selectedAddress ? (
                        <p>선택한 주소: {selectedAddress}</p>
                      ) : (
                        <h2>사진관 위치</h2>
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
                        onAddressSelect={(address) =>
                          handleAddressSelect(address)
                        }
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
              </>
            )}
          </Styled.UploadContents>
          <Styled.CloseBtn
            className="closeBtn"
            onClick={() => closeUploadModal()}
          >
            <img src={CloseIcon} alt="닫기버튼" />
          </Styled.CloseBtn>
        </div>
      </Styled.StyledDialog>
    </>
  );
}

export default Upload;
