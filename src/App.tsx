import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/splash/Splash';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Splash />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
