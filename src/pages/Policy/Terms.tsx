import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import TopBar from '../../components/Topbar/Topbar';
import StyledPolicy from './StyledPolicy';
import StyledH2 from '../../components/CommonStyled/StyledH2';

import terms from './termsText';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';

export default function Terms() {
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
      <Helmet>
        <title>Terms of use | MOMOO</title>
      </Helmet>

      {clientWitch <= 430 && <TopBar tit="MOMOO 이용약관" />}
      <StyledPolicy>
        {clientWitch > 1024 && (
          <>
            <StyledH2>MOMOO 이용약관</StyledH2>
            <Breadcrumb
              navList={[
                { path: 'home', text: 'Home' },
                { path: 'terms', text: 'Terms of use' },
              ]}
            />
          </>
        )}
        {clientWitch > 430 && clientWitch <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'terms', text: 'Terms of use' },
            ]}
            title="MOMOO 이용약관"
          />
        )}
        <section>
          <ol>
            {terms.map((v) => {
              if (typeof v.text === 'string') {
                return (
                  <li>
                    <h4>{v.title}</h4>
                    <p>{v.text}</p>
                  </li>
                );
              }

              return (
                <li>
                  <h4>{v.title}</h4>
                  <ul>
                    {v.text.map((v) => {
                      if (typeof v === 'string') {
                        return <li>{v}</li>;
                      }

                      return (
                        <li>
                          {v.subTitle}
                          <ul>
                            {v.text.map((item) => (
                              <li>{item}</li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </section>
      </StyledPolicy>
    </>
  );
}
