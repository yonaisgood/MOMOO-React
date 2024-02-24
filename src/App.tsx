import { useState } from 'react';

import useAuthContext from './hooks/useAuthContext';

import Router from './Routes/Router';
import Splash from './pages/Splash/Splash';
import GlobalStyle from './GlobalStyle';

function App() {
  const [splashRended, setSplashRended] = useState(false);
  const { isAuthReady } = useAuthContext();

  return (
    <>
      <GlobalStyle />
      {splashRended && isAuthReady ? (
        <>
          <Router />
        </>
      ) : (
        <Splash setSplashRended={setSplashRended} />
      )}
    </>
  );
}

export default App;
