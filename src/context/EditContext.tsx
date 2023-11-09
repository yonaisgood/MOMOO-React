import { createContext, useState } from 'react';

interface ContextType {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  feedIdtoEdit: string;
  setFeedIdtoEdit: React.Dispatch<React.SetStateAction<string>>;
}

const EditContext = createContext<ContextType>({
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  feedIdtoEdit: '',
  setFeedIdtoEdit: () => {},
});

export default function EditContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [feedIdtoEdit, setFeedIdtoEdit] = useState('');

  return (
    <EditContext.Provider
      value={{
        isEditModalOpen,
        setIsEditModalOpen,
        feedIdtoEdit,
        setFeedIdtoEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export { EditContext };
