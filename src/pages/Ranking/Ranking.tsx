import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import RankingContents from '@src/pageContents/RankingContents/RankingContents';

import useGetRanking from './hooks/useGetRanking';
import useFilter from './hooks/useFilter';

import { GENRE, URL } from '@src/RootRouter/url';
import { getQueryParam } from '@src/utils';

function Ranking() {
  const { search } = useLocation();
  const nav = useNavigate();
  const { fetch } = useGetRanking();
  const { onFilter, initFilterFlag } = useFilter();

  const onLoadNextPage = () => {
    fetch({
      isInit: false,
      queryParam: getQueryParam(search),
    });
  };

  useEffect(() => {
    const queryParam = getQueryParam(search);

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
    <RankingContents
      queryParam={getQueryParam(search)}
      onLoadNextPage={onLoadNextPage}
      onFilter={onFilter}
    />
  );
}

export default Ranking;
