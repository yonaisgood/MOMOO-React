import { useState } from 'react';

import Router from './Routes/Router';
import Splash from './pages/Splash/Splash';
import GlobalStyle from './GlobalStyle';

function App() {
  const [splashRended, setSplashRended] = useState(false);

  return (
    <>
      <GlobalStyle />
      {splashRended ? (
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
