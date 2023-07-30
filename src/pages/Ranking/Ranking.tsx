import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import RankingContents from '@src/pageContents/RankingContents/RankingContents';

import useGetRanking from './hooks/useGetRanking';
import useFilter from './hooks/useFilter';

import { GENRE, URL } from '@src/RootRouter/url';

function Ranking() {
  const { search } = useLocation();
  const nav = useNavigate();
  const { fetch } = useGetRanking();
  const { onFilter, initFilterFlag } = useFilter();

  const getQueryParam = () => {
    const urlSearchParams = new URLSearchParams(search);
    return urlSearchParams.get('genre') || '';
  };

  const onLoadNextPage = () => {
    fetch({
      isInit: false,
      queryParam: getQueryParam(),
    });
  };

  useEffect(() => {
    const queryParam = getQueryParam();

    const isAnotherPage = queryParam !== GENRE[0] && queryParam !== GENRE[1];

    if (isAnotherPage) {
      nav(`${URL.ranking}?genre=${GENRE[0]}`);
      return;
    }
    fetch({
      isInit: true,
      queryParam,
    });
    initFilterFlag();
  }, [search]);

  return (
    <RankingContents onLoadNextPage={onLoadNextPage} onFilter={onFilter} />
  );
}

export default Ranking;
