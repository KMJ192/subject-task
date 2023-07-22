import { useRef, useState } from 'react';
import { fetcher } from '@src/network/fetcher';
import useUrlSearchParams from '@src/hooks/useUrlSearchParams';
import useThrottle from '@src/hooks/useThrottle';
import { GENRE } from '@src/RootRouter/url';

// 연재 요일
type Period = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// 작가 롤
type ArtistRole =
  | 'writer'
  | 'painter'
  | 'scripter'
  | 'original'
  | 'publisher'
  | 'label';

type Artist = {
  name: string; // 작가 필명
  role: ArtistRole; // 작가 롤
  id: string; // 작가 id
};

type ComicRankItem = {
  id: number; // 작품 id
  alias: string; // 작품 별칭
  title: string; // 작품 타이틀
  artists: Artist[]; // 작가 정보
  schedule: {
    periods: Period[]; // 연재 요일
  };
  genres: string[]; // 작품 장르
  freedEpisodeSize: number; // 무료회차 수
  contentsState: 'scheduled' | 'completed'; // 연재, 완결 값
  currentRank: number; // 현재 랭킹
  previousRank: number; // 이전 랭킹
  updatedAt: number; // 업데이트 일자
  isPrint: boolean; // 단행본 여부
  thumbnailSrc: string;
};

type ComicRankApiSuccessResModel = {
  count: number; // 아이템 전체 카운트
  hasNext: boolean; // 다음 page 존재 여부
  data: ComicRankItem[]; // 아이템 리스트
};

// interface ComicRankApiFailResponseModel {
//   error: string; // 에러 메시지
// }

function useGetRanking() {
  const initRankingList = useRef({
    count: -1,
    hasNext: true,
    data: [],
  });
  const page = useRef(1);

  const { queryParam } = useUrlSearchParams({ url: 'genre' });

  const [loading, setLoading] = useState(false);
  const [rankingList, setRankingList] = useState<ComicRankApiSuccessResModel>(
    initRankingList.current,
  );
  const [errorMsg, setErrorMsg] = useState('');

  const fetch = useThrottle(async () => {
    if (!rankingList.hasNext) return;
    if (loading) return;
    if (queryParam !== GENRE[0] && queryParam !== GENRE[1]) return;
    setLoading(true);
    const response = await fetcher<ComicRankApiSuccessResModel>({
      url: `/api/comics/${queryParam}`,
      method: 'GET',
      params: {
        page: page.current,
      },
    });
    const { status, isSuccess, data, message } = response;

    if (status === 200 && isSuccess) {
      if (
        !data ||
        typeof data.count !== 'number' ||
        typeof data.hasNext !== 'boolean' ||
        !Array.isArray(data.data)
      ) {
        setErrorMsg('데이터를 받아오는데 실패했습니다.');
        return;
      }
      page.current += 1;
      setRankingList({
        hasNext: data.hasNext,
        count: data.count,
        data: rankingList.data.concat(data.data),
      });
    }

    if (status === 500) {
      setErrorMsg('Network Error');
    }

    setErrorMsg(message);
    setLoading(false);
  }, 200);

  const nextPage = () => {
    fetch();
  };

  return {
    rankingList,
    errorMsg,
    loading,
    nextPage,
    fetch,
  };
}

export type { Period, Artist, ComicRankItem, ComicRankApiSuccessResModel };
export default useGetRanking;
