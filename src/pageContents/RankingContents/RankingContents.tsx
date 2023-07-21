import useUrlSearchParams from '@src/hooks/useUrlSearchParams';

import style from './style.module.scss';

import type { ComicRankApiSuccessResModel } from '@src/pages/Ranking/hooks/useGetRanking';
import InfiniteScroll from '@src/components/InfiniteScroll/InfiniteScroll';
import Spinner from '@src/components/Spinner/Spinner';
import { GENRE } from '@src/RootRouter/url';

type Props = {
  loading: boolean;
  rankingList: ComicRankApiSuccessResModel;
  nextPage: () => void;
};

function RankingContents({ loading, rankingList, nextPage }: Props) {
  const { queryParam } = useUrlSearchParams({ url: 'genre' });

  return (
    <div className={style.container}>
      <div className={style.title}>
        <div>
          {queryParam === GENRE[0] && '로맨스'}
          {queryParam === GENRE[1] && '드라마'} 장르 랭킹
        </div>
      </div>
      <div className={style.spacing}></div>
      <div className={style.sort}>
        <button>연재 중</button>
        <button>완결</button>
        <button>무료회차 가기</button>
      </div>
      <div className={style.spacing}></div>
      <div className={style.divideLine}></div>
      <div className={style.spacing}></div>
      <InfiniteScroll
        as='ul'
        className={style.contents}
        loadCnt={rankingList.data.length}
        loading={loading}
        loadingElement={<Spinner />}
        onLoad={nextPage}
      >
        {rankingList.data.map((d, index) => {
          return (
            <li key={`${d.id}-${index}`} className={style.item}>
              {index}
            </li>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default RankingContents;
