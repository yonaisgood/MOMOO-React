import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/splash/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Setting from './pages/Setting/Setting';
import Upload from './pages/Upload/Upload';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Splash />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/upload' element={<Upload />}></Route>

            <Route path='/setting' element={<Setting />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
