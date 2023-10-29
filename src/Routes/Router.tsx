import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Splash from '../pages/splash/Splash';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Setting from '../pages/Setting/Setting';
import My from '../pages/My/My';
import NavRoute from './NavRoute';
import Home from '../pages/Home/Home';
import Terms from '../pages/Policy/Terms';
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy';
import { AuthRoute, NonAuthRoute } from './AuthRoute';
import Feed from '../pages/Feed/Feed';

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
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/my" element={<My />}></Route>
              <Route path="/setting" element={<Setting />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
