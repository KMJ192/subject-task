import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { fetcher } from '@src/network/fetcher';
import useUrlSearchParams from '@src/hooks/useUrlSearchParams';
import { GENRE } from '@src/RootRouter/url';
import {
  RankingListInfoAtom,
  rankingListInfoAtom,
} from '@src/store/pages/Ranking/atom';

type Period = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

type ArtistRole =
  | 'writer'
  | 'painter'
  | 'scripter'
  | 'original'
  | 'publisher'
  | 'label';

type Artist = {
  name: string;
  role: ArtistRole;
  id: string;
};

type ComicRankItem = {
  id: number;
  alias: string;
  title: string;
  artists: Artist[];
  schedule: {
    periods: Period[];
  };
  genres: string[];
  freedEpisodeSize: number;
  contentsState: 'scheduled' | 'completed';
  currentRank: number;
  previousRank: number;
  updatedAt: number;
  isPrint: boolean;
  thumbnailSrc: string;
};

type ComicRankApiSuccessResModel = {
  count: number;
  hasNext: boolean;
  data: ComicRankItem[];
};

function useGetRanking() {
  const { queryParam } = useUrlSearchParams({ url: 'genre' });
  const pageCnt = useRef(0);
  const [rankingListInfo, setRankingListInfo] =
    useRecoilState<RankingListInfoAtom>(rankingListInfoAtom);

  const request = async (
    queryParam: string,
    isInit: boolean,
  ): Promise<RankingListInfoAtom> => {
    if (isInit) {
      pageCnt.current = 0;
    }
    pageCnt.current += 1;
    const response = await fetcher<ComicRankApiSuccessResModel>({
      url: `/api/comics/${queryParam}`,
      method: 'GET',
      params: {
        page: pageCnt.current,
      },
    });
    const { status, isSuccess, data, message } = response;
    const newState: RankingListInfoAtom = isInit
      ? {
          hasNext: true,
          rankingList: [],
          loading: false,
          errorMsg: '',
          currentGenre: '',
        }
      : JSON.parse(JSON.stringify(rankingListInfo));

    newState.loading = false;
    newState.currentGenre = queryParam;

    if (status === 200 && isSuccess) {
      if (!data || !Array.isArray(data.data)) {
        return {
          ...newState,
          errorMsg: '데이터를 받아오는데 실패했습니다.',
        };
      }

      return {
        ...newState,
        hasNext: data.hasNext,
        rankingList: isInit
          ? data.data
          : rankingListInfo.rankingList.concat(data.data),
      };
    }
    if (status === 500) {
      return {
        ...newState,
        errorMsg: 'Network Error',
      };
    }

    return {
      ...newState,
      errorMsg: message,
    };
  };

  const fetch = async (isInit: boolean) => {
    if (
      (queryParam !== GENRE[0] && queryParam !== GENRE[1]) ||
      (!isInit && !rankingListInfo.hasNext) ||
      (!isInit && rankingListInfo.loading)
    ) {
      return;
    }
    setRankingListInfo({
      ...rankingListInfo,
      loading: true,
    });
    const newState = await request(queryParam, isInit);
    setRankingListInfo(newState);
  };

  return {
    fetch,
  };
}

export type { Artist, ComicRankItem, ComicRankApiSuccessResModel, Period };
export default useGetRanking;
