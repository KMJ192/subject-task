import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GENRE, URL } from '@src/RootRouter/url';

import useUrlSearchParams from '@src/hooks/useUrlSearchParams';

import useGetRanking from './hooks/useGetRanking';

import RankingContents from '@src/pageContents/RankingContents/RankingContents';

function Ranking() {
  const nav = useNavigate();

  const { queryParam } = useUrlSearchParams({ url: 'genre' });
  const { loading, rankingList, errorMsg, fetch, nextPage } = useGetRanking();

  useEffect(() => {
    const isAnotherPage =
      queryParam !== '' && queryParam !== GENRE[0] && queryParam !== GENRE[1];

    if (isAnotherPage) {
      nav(`${URL.ranking}?genre=${GENRE[0]}`);
      return;
    }
    if (queryParam === GENRE[0] || queryParam === GENRE[1]) {
      fetch();
    }
  }, [queryParam]);

  return (
    <RankingContents
      loading={loading}
      rankingList={rankingList}
      nextPage={nextPage}
    />
  );
}

export default Ranking;
