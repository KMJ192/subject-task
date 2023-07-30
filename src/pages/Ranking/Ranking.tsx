import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import RankingContents from '@src/pageContents/RankingContents/RankingContents';

import useUrlSearchParams from '@src/hooks/useUrlSearchParams';
import useGetRanking from './hooks/useGetRanking';
import useFilter from './hooks/useFilter';

import { GENRE, URL } from '@src/RootRouter/url';

function Ranking() {
  const { search } = useLocation();
  const { queryParam } = useUrlSearchParams({ url: 'genre' });
  const nav = useNavigate();
  const { fetch } = useGetRanking();
  const { onFilter, initFilterFlag } = useFilter();

  const onLoadNextPage = () => {
    fetch(false);
  };

  useEffect(() => {
    const isAnotherPage =
      (queryParam !== '' &&
        queryParam !== GENRE[0] &&
        queryParam !== GENRE[1]) ||
      search === '' ||
      search === '?genre=' ||
      !search.includes('?genre=');

    if (isAnotherPage) {
      nav(`${URL.ranking}?genre=${GENRE[0]}`);
      return;
    }
    fetch(true);
    initFilterFlag();
  }, [queryParam]);

  return (
    <RankingContents onLoadNextPage={onLoadNextPage} onFilter={onFilter} />
  );
}

export default Ranking;
