import { appFireStore } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';

export function useRemoveFeedIdfromFeedList() {
  const { user } = useAuthContext();

  const removeFeedIdfromFeedList = async (
    feedId: string,
    unSelectedAlbumId: string,
  ) => {
    if (!user) {
      return;
    }

    const albumRefQuery = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      unSelectedAlbumId,
    );

    await updateDoc(albumRefQuery, {
      feedList: arrayRemove(feedId),
    });
  };

  return removeFeedIdfromFeedList;
}

export function useAddFeedIdfromFeedList() {
  const { user } = useAuthContext();

  const addFeedIdfromFeedList = async (
    feedId: string,
    selectedAlbumId: string,
  ) => {
    if (!user) {
      return;
    }

    const albumRefQuery = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      selectedAlbumId,
    );

    await updateDoc(albumRefQuery, {
      feedList: arrayUnion(feedId),
    });
  };

  return addFeedIdfromFeedList;
}
