import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { GENRE, URL } from '@src/RootRouter/url';

import style from './style.module.scss';
import { getQueryParam } from '@src/utils';

type Props = {
  children: ReactNode;
};

function PageTemplate({ children }: Props) {
  const nav = useNavigate();

  const { search } = useLocation();

  const onNav = (type: 'romance' | 'drama') => {
    const queryParam = getQueryParam(search);
    if (type === 'romance' && queryParam !== type) {
      nav(`${URL.ranking}?genre=${GENRE[0]}`);
      return;
    }
    if (type === 'drama' && queryParam !== type) {
      nav(`${URL.ranking}?genre=${GENRE[1]}`);
    }
  };

  return (
    <main className={style.container}>
      <header className={style.header}>
        <Button onClick={() => onNav('romance')}>로맨스 장르</Button>
        <Button onClick={() => onNav('drama')}>드라마 장르</Button>
      </header>
      <section className={style.contents}>{children}</section>
    </main>
  );
}

export default PageTemplate;
