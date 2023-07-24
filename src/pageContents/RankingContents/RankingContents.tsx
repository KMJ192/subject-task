import { useRecoilValue } from 'recoil';
import useUrlSearchParams from '@src/hooks/useUrlSearchParams';

import {
  rankingFilterFlagAtom,
  rankingListInfoAtom,
} from '@src/store/pages/Ranking/atom';

import InfiniteScroll from '@src/components/InfiniteScroll/InfiniteScroll';
import Spinner from '@src/components/Spinner/Spinner';
import Button from '@src/components/Button/Button';
import ListItem from './ListItem/ListItem';

import { GENRE } from '@src/RootRouter/url';

import type { FilterType } from '@src/pages/Ranking/hooks/useFilter';

import style from './style.module.scss';

type Props = {
  nextPage: () => void;
  onFilter: (filterType: FilterType) => void;
};

function RankingContents({ nextPage, onFilter }: Props) {
  const { rankingList, hasNext, loading, currentGenre } =
    useRecoilValue(rankingListInfoAtom);
  const filterFlag = useRecoilValue(rankingFilterFlagAtom);
  const { queryParam } = useUrlSearchParams({ url: 'genre' });
  const isGenre = currentGenre === queryParam;

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
        <Button onClick={() => onFilter('all')}>전체 보기</Button>
        <Button
          className={filterFlag.scheduled ? style.isSelect : ''}
          onClick={() => onFilter('scheduled')}
        >
          연재 중
        </Button>
        <Button
          className={filterFlag.completion ? style.isSelect : ''}
          onClick={() => onFilter('completion')}
        >
          완결
        </Button>
        <Button
          className={filterFlag.freedEpisode3 ? style.isSelect : ''}
          onClick={() => onFilter('freedEpisode3')}
        >
          무료회차 3개 이상
        </Button>
        <Button
          className={filterFlag.print ? style.isSelect : ''}
          onClick={() => onFilter('print')}
        >
          단행본 작품
        </Button>
      </div>
      <div className={style.spacing}></div>
      <div className={style.divideLine}></div>
      <div className={style.spacing}></div>
      <InfiniteScroll
        as='ul'
        className={style.contents}
        loadCnt={rankingList.length}
        loading={loading}
        hasNext={!hasNext}
        isObserve={isGenre}
        loadingElement={<Spinner />}
        onLoad={nextPage}
      >
        {isGenre &&
          rankingList
            .filter(({ contentsState, freedEpisodeSize, isPrint }) => {
              if (filterFlag.all) return true;
              if (
                (filterFlag.scheduled && contentsState === 'scheduled') ||
                (filterFlag.completion && contentsState === 'completed') ||
                (filterFlag.freedEpisode3 && freedEpisodeSize > 3) ||
                (filterFlag.print && isPrint)
              ) {
                return true;
              }
              return false;
            })
            .map((d, index) => {
              return (
                <li key={`${d.id}-${index}`} className={style.item}>
                  <ListItem index={index} comicRankItem={d} />
                </li>
              );
            })}
      </InfiniteScroll>
    </div>
  );
}

export default RankingContents;
