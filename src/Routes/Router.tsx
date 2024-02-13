import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import useAuthContext from '../hooks/useAuthContext';

import Terms from '../pages/Policy/Terms';
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy';
import Login from '../pages/Login';
import Signup from '../pages/Signup/Signup';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Detail from '../pages/Detail/Detail';
import My from '../pages/My/My';
import Setting from '../pages/Setting/Setting';
import NavRoute from './NavRoute';
import { AuthRoute, NonAuthRoute } from './AuthRoute';
import StaticSplash from '../pages/Splash/StaticSplash';
import Upload from '../pages/Upload';
import Edit from '../pages/Edit';
import Error from '../pages/Error/Error';

export default function Router() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const { isAuthReady } = useAuthContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isAuthReady ? (
            <Route path="*" element={<StaticSplash />}></Route>
          ) : (
            <>
              <Route element={<NonAuthRoute />}>
                <Route element={clientWitch > 430 ? <NavRoute /> : <Outlet />}>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                </Route>
              </Route>

              <Route element={<AuthRoute />}>
                <Route element={<NavRoute />}>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/album/:id" element={<Album />}></Route>
                  <Route path="/feed/:id" element={<Detail />}></Route>
                  {clientWitch <= 430 && (
                    <Route path="/my" element={<My />}></Route>
                  )}
                  {clientWitch <= 430 && (
                    <Route path="/upload" element={<Upload />}></Route>
                  )}
                  {clientWitch <= 430 && (
                    <Route path="/edit/:id" element={<Edit />}></Route>
                  )}
                  <Route path="/setting" element={<Setting />}></Route>
                </Route>
              </Route>

              <Route element={<NavRoute />}>
                <Route path="/terms" element={<Terms />}></Route>
                <Route path="/privacy" element={<PrivacyPolicy />}></Route>
                <Route path="/*" element={<Error />}></Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
