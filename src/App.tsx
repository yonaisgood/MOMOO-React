import GlobalStyle from './GlobalStyle';
import useAuthContext from './hooks/useAuthContext';
import useEditContext from './hooks/useEditContext';
import Router from './Routes/Router';
import EditFeed from './components/Upload/EditFeed';

function App() {
  const { isAuthReady } = useAuthContext();
  const { isEditModalOpen } = useEditContext();

  return (
    <>
      {isAuthReady ? (
        <>
          <GlobalStyle />
          <Router />
          {isEditModalOpen && <EditFeed />}
        </>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

export default App;
