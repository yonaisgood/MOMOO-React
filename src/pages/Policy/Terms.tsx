import { useEffect, useState } from 'react';
import StyledMain from './StyledMain';
import terms from './termsText';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import TopBar from '../../components/Topbar/Topbar';

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
      <StyledMain>
        {clientWitch > 430 && (
          <Breadcrumb
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'terms', text: 'Terms of use' },
            ]}
          />
        )}
        <section>
          {clientWitch > 430 && <h2>MOMOO 이용약관</h2>}
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
      </StyledMain>
    </>
  );
}
