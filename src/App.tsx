import useAuthContext from './hooks/useAuthContext';

import Router from './Routes/Router';

import GlobalStyle from './GlobalStyle';

function App() {
  const { isAuthReady } = useAuthContext();

  return (
    <>
      {isAuthReady ? (
        <>
          <GlobalStyle />
          <Router />
        </>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

export default App;
