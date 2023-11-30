import { SyntheticEvent, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAuthContext from '../../../hooks/useAuthContext';
import {
  useAddFeedIdFromFeedList,
  useRemoveFeedIdFromFeedList,
} from '../../../hooks/useUpdateFeedList';
import useGetSavedAlbumList from '../../../hooks/useGetSavedAlbumList';

import GetAccordionData from '../../Upload/GetAccordionData';
import {
  ChangeModalWrap,
  MultiAccordionWrapper,
} from './StyledChangeAlbumModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';

interface AccordionProps {
  answer: string;
  onClose: () => void;
}

export default function ChangeAlbumModal({ onClose, answer }: AccordionProps) {
  interface AlbumIdData {
    albumName: string;
    docId: string;
  }

  const { user } = useAuthContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedAlbumList, setSelectedAlbumList] = useState<string[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [savedAlbumList, setSavedAlbumList] = useState<string[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const getAccordionData = GetAccordionData();
  const getSavedAlbumList = useGetSavedAlbumList();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();
  const answerArray = answer.split(',');

  const { id } = useParams();
  if (!id) {
    return;
  }

  useEffect(() => {
    const setSavedAlbumData = async () => {
      const data = await getSavedAlbumList(id);

      if (data) {
        setSelectedAlbumList(data.map((v) => v.data().name));
        setSavedAlbumList(data.map((v) => v.id));
      } else {
        return;
      }
    };

    const SetAcoordionData = async () => {
      if (user) {
        const result = await getAccordionData();
        setAlbumIdData(result.albumIdData || []);
      }
    };

    setSavedAlbumData();
    SetAcoordionData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await getAccordionData();
        setAlbumIdData(result.albumIdData || []);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;
          if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      selectedAlbumList.forEach(async (selectedAlbumName) => {
        let selectedAlbumId = '';

        for (const iterator of albumIdData) {
          if (selectedAlbumName === iterator.albumName) {
            selectedAlbumId = iterator.docId;
          }
        }

        if (!savedAlbumList.includes(selectedAlbumId)) {
          await addFeedIdFromFeedList(id, selectedAlbumId);
        }
      });

      savedAlbumList.forEach(async (savedAlbumId) => {
        let savedAlbumName = '';

        for (const iterator of albumIdData) {
          if (savedAlbumId === iterator.docId) {
            savedAlbumName = iterator.albumName;
          }
        }

        if (!selectedAlbumList.includes(savedAlbumName)) {
          await removeFeedIdFromFeedList(id, savedAlbumId);
        }
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const MultiAnswerClick = (text: string) => {
    const isSelected = selectedAlbumList.includes(text);

    if (isSelected) {
      setSelectedAlbumList(selectedAlbumList.filter((album) => album !== text));
    } else {
      setSelectedAlbumList([...selectedAlbumList, text]);
    }
  };

  return (
    <ChangeModalWrap role="dialog" aria-labelledby="modal-select">
      <ModalOverlay>
        <div
          className="modalContent"
          role="document"
          tabIndex={-1}
          ref={modalRef}
        >
          <header className="modal-header" id="modal-select">
            <h2 tabIndex={0}>앨범 변경하기</h2>
            <p> 저장할 앨범을 선택해주세요.</p>
          </header>

          <MultiAccordionWrapper>
            <div className="anw" id="multiAnswer">
              {answerArray.map((item, index) => {
                return (
                  <button
                    type="button"
                    disabled={item === '전체 보기' ? true : false}
                    key={index}
                    onClick={() => MultiAnswerClick(item)}
                    className={
                      selectedAlbumList.includes(item) ? 'selected' : ''
                    }
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </MultiAccordionWrapper>
          <div className="modalList">
            <button type="button" onClick={onClose} ref={closeButtonRef}>
              취소
            </button>
            <button type="submit" onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      </ModalOverlay>
    </ChangeModalWrap>
  );
}
