import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RankingContents from '@src/pageContents/RankingContents/RankingContents';

import useUrlSearchParams from '@src/hooks/useUrlSearchParams';
import useGetRanking from './hooks/useGetRanking';
import useFilter from './hooks/useFilter';

import { GENRE, URL } from '@src/RootRouter/url';

function Ranking() {
  const { queryParam } = useUrlSearchParams({ url: 'genre' });
  const nav = useNavigate();
  const { fetch, nextPage } = useGetRanking();
  const { onFilter } = useFilter();

  useEffect(() => {
    const isAnotherPage =
      queryParam !== '' && queryParam !== GENRE[0] && queryParam !== GENRE[1];

    if (isAnotherPage) {
      nav(`${URL.ranking}?genre=${GENRE[0]}`);
      return;
    }
    fetch(true);
  }, [queryParam]);

  return <RankingContents nextPage={nextPage} onFilter={onFilter} />;
}

export default Ranking;
