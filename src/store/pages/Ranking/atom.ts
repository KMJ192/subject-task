import { ComicRankItem } from '@src/pages/Ranking/hooks/useGetRanking';
import { atom } from 'recoil';

type RankingListInfoAtom = {
  hasNext: boolean;
  rankingList: ComicRankItem[];
  loading: boolean;
  errorMsg: string;
  currentGenre: string;
};

type RankingFilterFlag = {
  all: boolean;
  scheduled: boolean;
  completion: boolean;
  freedEpisode3: boolean;
  print: boolean;
};

const rankingListInfoAtom = atom<RankingListInfoAtom>({
  key: '@src/pages/Ranking/rankingList',
  default: {
    hasNext: true,
    rankingList: [],
    loading: false,
    errorMsg: '',
    currentGenre: '',
  },
});

const rankingFilterFlagAtom = atom<RankingFilterFlag>({
  key: '@src/pages/Ranking/filterFlag',
  default: {
    all: true,
    scheduled: false,
    completion: false,
    freedEpisode3: false,
    print: false,
  },
});

export type { RankingListInfoAtom, RankingFilterFlag };
export { rankingFilterFlagAtom, rankingListInfoAtom };
