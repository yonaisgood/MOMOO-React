import { useEffect, useState } from 'react';
import StyledMain from './StyledMain';
import privacyPolicy from './privacyText';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

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
      <StyledMain>
        {clientWitch > 430 && (
          <Breadcrumb
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'policy', text: 'Privacy policy' },
            ]}
          />
        )}
        <section>
          {clientWitch > 430 && <h2>개인정보처리방침</h2>}
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
      </StyledMain>
    </>
  );
}
