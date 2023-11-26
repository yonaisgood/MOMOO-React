import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Splash from '../pages/Splash/Splash';
import Terms from '../pages/Policy/Terms';
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Detail from '../pages/Detail/Detail';
import My from '../pages/My/My';
import Setting from '../pages/Setting/Setting';
import NavRoute from './NavRoute';
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
              <Route path="/album/:id" element={<Album />}></Route>
              <Route path="/feed/:id" element={<Detail />}></Route>
              <Route path="/my" element={<My />}></Route>
              <Route path="/setting" element={<Setting />}></Route>
            </Route>
          </Route>

          <Route
            path="/404"
            element={<div>존재하지 않는 페이지입니다</div>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
