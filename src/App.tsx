import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/splash/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Setting from './pages/Setting/Setting';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Splash />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          <Route path='/setting' element={<Setting />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
