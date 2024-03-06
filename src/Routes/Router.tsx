import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Terms from '../pages/Policy/Terms';
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Detail from '../pages/Detail/Detail';
import My from '../pages/My/My';
import EditProfile from '../pages/EditProfile/EditProfile';
import Upload from '../pages/Upload';
import Edit from '../pages/Edit';
import NotFound from '../pages/NotFound/NotFound';
import { AuthRoute, NonAuthRoute } from './AuthRoute';
import NavRoute from './NavRoute';
import DialogRoute from './DialogRoute';

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
          <Route element={<NonAuthRoute />}>
            <Route element={clientWitch > 430 ? <NavRoute /> : <Outlet />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Route>
          </Route>

          <Route element={<DialogRoute />}>
            <Route element={<AuthRoute />}>
              <Route element={<NavRoute />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/:uid/:album" element={<Album />}></Route>
                <Route path="/:uid/:album/p/:id" element={<Detail />}></Route>
                {clientWitch <= 430 && (
                  <>
                    <Route path="/my" element={<My />}></Route>
                    <Route path="/upload" element={<Upload />}></Route>
                    <Route path="/edit/:id" element={<Edit />}></Route>
                  </>
                )}
                <Route path="/edit-profile" element={<EditProfile />}></Route>
              </Route>
            </Route>

            <Route element={clientWitch > 430 ? <NavRoute /> : <Outlet />}>
              <Route path="/terms" element={<Terms />}></Route>
              <Route path="/privacy" element={<PrivacyPolicy />}></Route>
            </Route>

            <Route element={<NavRoute />}>
              <Route path="/*" element={<NotFound />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
