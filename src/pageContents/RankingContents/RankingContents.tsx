import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import {
  rankingFilterFlagAtom,
  rankingListInfoAtom,
} from '@src/store/pages/Ranking/atom';

import InfiniteScroll from '@src/components/InfiniteScroll/InfiniteScroll';
import Spinner from '@src/components/Spinner/Spinner';
import Button from '@src/components/Button/Button';
import RankingList from './RankingList/RankingList';

import { GENRE } from '@src/RootRouter/url';

import type { FilterType } from '@src/pages/Ranking/hooks/useFilter';

import style from './style.module.scss';

type Props = {
  queryParam: string;
  onLoadNextPage: () => void;
  onFilter: (filterType: FilterType) => void;
};

function RankingContents({ queryParam, onLoadNextPage, onFilter }: Props) {
  const infiniteScrollRef = useRef(null);
  const { rankingList, hasNext, loading, currentGenre, errorMsg } =
    useRecoilValue(rankingListInfoAtom);
  const filterFlag = useRecoilValue(rankingFilterFlagAtom);

  const isGenre = currentGenre === queryParam;

  const filter = (filterType: FilterType) => {
    if (infiniteScrollRef.current) {
      const infiniteScroll = infiniteScrollRef.current as HTMLUListElement;
      infiniteScroll.scrollTo({
        top: 0,
      });
    }
    onFilter(filterType);
  };

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
        <Button onClick={() => filter('all')}>전체 보기</Button>
        <Button
          className={filterFlag.scheduled ? style.isSelect : ''}
          onClick={() => filter('scheduled')}
        >
          연재 중
        </Button>
        <Button
          className={filterFlag.completion ? style.isSelect : ''}
          onClick={() => filter('completion')}
        >
          완결
        </Button>
        <Button
          className={filterFlag.freedEpisode3 ? style.isSelect : ''}
          onClick={() => filter('freedEpisode3')}
        >
          무료회차 3개 이상
        </Button>
        <Button
          className={filterFlag.print ? style.isSelect : ''}
          onClick={() => filter('print')}
        >
          단행본 작품
        </Button>
      </div>
      <div className={style.spacing}></div>
      <div className={style.divideLine}></div>
      <div className={style.spacing}></div>
      <div className={style.error}>{errorMsg}</div>
      <InfiniteScroll
        as='ul'
        ref={infiniteScrollRef}
        className={style.contents}
        loadCnt={rankingList.length}
        isLoading={loading}
        hasNext={!hasNext}
        isObserve={isGenre}
        loadingElement={<Spinner />}
        onLoad={onLoadNextPage}
      >
        {isGenre && <RankingList />}
      </InfiniteScroll>
    </div>
  );
}

export default RankingContents;
