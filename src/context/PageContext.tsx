import { createContext, useState } from 'react';

interface ContextType {
  prevPath: null | string;
  setPrevPath: React.Dispatch<React.SetStateAction<null | string>>;
}

const PageContext = createContext<ContextType>({
  prevPath: null,
  setPrevPath: () => {},
});

export default function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prevPath, setPrevPath] = useState<null | string>(null);

  return (
    <PageContext.Provider
      value={{
        prevPath,
        setPrevPath,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export { PageContext };
