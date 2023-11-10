import { createContext, useState } from 'react';

interface ContextType {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  albumNametoAdd: string;
  setAlbumNametoAdd: React.Dispatch<React.SetStateAction<string>>;
}

const UploadContext = createContext<ContextType>({
  isUploadModalOpen: false,
  setIsUploadModalOpen: () => {},
  albumNametoAdd: '',
  setAlbumNametoAdd: () => {},
});

export default function UploadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [albumNametoAdd, setAlbumNametoAdd] = useState('');

  return (
    <UploadContext.Provider
      value={{
        isUploadModalOpen,
        setIsUploadModalOpen,
        albumNametoAdd,
        setAlbumNametoAdd,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export { UploadContext };
