import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Nav from '../components/Nav/Nav';
import TabBar from '../components/TabBar/TabBar';

export default function NavRoute() {
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
      {clientWitch <= 430 ? <TabBar /> : <Nav />}
      <Outlet />
    </>
  );
}
