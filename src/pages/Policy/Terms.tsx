import { useEffect, useState } from 'react';

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
          {terms.map((v) => {
            if (v.list.length === 1 && typeof v.list[0] === 'string') {
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
