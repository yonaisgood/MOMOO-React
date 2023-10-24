import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Splash from '../pages/splash/Splash';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Setting from '../pages/Setting/Setting';
import Upload from '../pages/Upload/Upload';
import KakaoMap from '../components/Map/KakaoMap';
import My from '../pages/My/My';
import NavRoute from './NavRoute';
import Home from '../pages/Home/Home';
import Terms from '../pages/Policy/Terms';
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy';
import { AuthRoute, NonAuthRoute } from './AuthRoute';

export default function Router() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />}></Route>
          <Route element={<NavRoute />}>
            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/policy" element={<PrivacyPolicy />}></Route>
          </Route>

          <Route element={<NonAuthRoute />}>
            <Route element={clientWitch > 430 ? <NavRoute /> : <Outlet />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Route>
          </Route>

          <Route element={<AuthRoute />}>
            <Route element={<NavRoute />}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/my" element={<My />}></Route>
            </Route>
            <Route path="/upload" element={<Upload />}></Route>
            <Route path="/kakaoMap" element={<KakaoMap />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
