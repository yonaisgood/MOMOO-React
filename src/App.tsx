import GlobalStyle from './GlobalStyle';
import useAuthContext from './hooks/useAuthContext';
import Router from './Routes/Router';
import PageContextProvider from './context/PageContext';

function App() {
  const { isAuthReady } = useAuthContext();

  return (
    <>
      {isAuthReady ? (
        <PageContextProvider>
          <GlobalStyle />
          <Router />
        </PageContextProvider>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

export default App;
