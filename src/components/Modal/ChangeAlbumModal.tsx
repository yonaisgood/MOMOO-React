import { SyntheticEvent, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuthContext from '../../hooks/useAuthContext';
import GetAccordionData from '../Upload/GetAccordionData';
import useGetSavedAlbumList from '../../hooks/useGetSavedAlbumList';
import {
  useAddFeedIdFromFeedList,
  useRemoveFeedIdFromFeedList,
} from '../../hooks/useUpdateFeedList';
import { useParams } from 'react-router-dom';

const ChangeModalWrap = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  header {
    padding: 2rem 0 1.8rem;
    text-align: center;
    font-size: var(--text-l);

    p {
      font-size: var(--text-s);
      color: var(--gray-600);
    }
  }

  .modalContent {
    overflow: hidden;
    background: var(--background-color);
    border-radius: 10px;
    width: 32rem;
    font-size: var(--text-l);
    position: relative;
  }

  .modalList {
    button {
      width: 50%;
      text-align: center;
      padding: 1.2rem 0;
      font-size: var(--text-m);
      transition: all 0.2s ease-in-out;
      border-top: 1px solid var(--gray-200);
    }

    button:first-child {
      border-right: 1px solid var(--gray-200);
    }

    button:hover {
      background-color: var(--point-color);
    }
  }
`;

const MultiAccordionWrapper = styled.div`
  min-height: 12rem;
  margin: 0 0 1.2rem 1.6rem;
  overflow: hidden;

  #multiAnswer {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    overflow-y: scroll;

    button {
      min-width: 8.8rem;
      background-color: var(--gray-100);
      padding: 0.7rem 1.6rem;
      font-size: var(--text-s);
      color: var(--gray-900);
      border-radius: 4px;
    }

    button:hover {
      background-color: var(--point-color);
    }

    button.selected {
      background-color: var(--point-color);
    }
  }
`;

interface AccordionProps {
  answer: string;
  onClose: () => void;
}

export default function ChangeAlbumModal({ onClose, answer }: AccordionProps) {
  interface AlbumIdData {
    albumName: string;
    docId: string;
  }

  interface AccordionData {
    question: string;
    answer: string[];
  }
  const { user } = useAuthContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedAlbumList, setSelectedAlbumList] = useState<string[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [savedAlbumList, setSavedAlbumList] = useState<string[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [accordionData, setAccordionData] = useState<AccordionData[]>([]);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
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
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    const setSavedAlbumData = async () => {
      const data = await getSavedAlbumList(id);
      console.log(id);
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
        setAccordionData(result.accordionData);
        setAlbumIdData(result.albumIdData);
      }
    };

    setSavedAlbumData();
    SetAcoordionData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await getAccordionData();
        console.log(result);
        setAccordionData(result.accordionData);
        setAlbumIdData(result.albumIdData);
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
      <div className="modal-overlay">
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
      </div>
    </ChangeModalWrap>
  );
}
