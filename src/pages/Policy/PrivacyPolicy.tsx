import { useEffect, useState } from 'react';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import TopBar from '../../components/Topbar/Topbar';
import StyledPolicy from './StyledPolicy';

import privacyPolicy from './privacyText';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import StyledH2 from '../../components/CommonStyled/StyledH2';

export default function PrivacyPolicy() {
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
      {clientWitch <= 430 && <TopBar tit="개인정보 처리방침" />}
      <StyledPolicy>
        {clientWitch > 1024 && (
          <>
            <StyledH2>개인정보 처리방침</StyledH2>
            <Breadcrumb
              navList={[
                { path: 'home', text: 'Home' },
                { path: 'policy', text: 'Privacy policy' },
              ]}
            />
          </>
        )}
        {clientWitch > 430 && clientWitch <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'policy', text: 'Privacy policy' },
            ]}
            title="개인정보 처리방침"
          />
        )}
        <section>
          {privacyPolicy.map((v) => {
            if (typeof v.list === 'string') {
              return (
                <>
                  <strong>{v.title}</strong>
                  <p>{v.list[0]}</p>
                </>
              );
            }

            return (
              <>
                <strong>{v.title}</strong>
                <ol>
                  {v.list.map((v) => {
                    if (typeof v === 'string') {
                      return <li>{v}</li>;
                    }

                    return (
                      <li>
                        {v.subTitle}
                        <ol>
                          {v.list.map((text) => (
                            <li>{text}</li>
                          ))}
                        </ol>
                      </li>
                    );
                  })}
                </ol>
              </>
            );
          })}
        </section>
      </StyledPolicy>
    </>
  );
}
