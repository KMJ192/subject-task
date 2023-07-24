import { useSetRecoilState } from 'recoil';
import {
  type RankingFilterFlag,
  rankingFilterFlagAtom,
} from '@src/store/pages/Ranking/atom';

type FilterType =
  | 'all'
  | 'completion'
  | 'scheduled'
  | 'freedEpisode3'
  | 'print';

function useFilter() {
  const setFilterFlag = useSetRecoilState(rankingFilterFlagAtom);

  const onFilter = (filterType: FilterType) => {
    setFilterFlag((prevState) => {
      const newState: RankingFilterFlag = JSON.parse(JSON.stringify(prevState));
      if (filterType === 'all') {
        newState.all = true;
        newState.completion = false;
        newState.scheduled = false;
        newState.freedEpisode3 = false;
        newState.print = false;
        return newState;
      }
      newState.all = false;
      newState[filterType] = !newState[filterType];
      if (filterType === 'scheduled' && newState.scheduled) {
        newState.completion = false;
      } else if (filterType === 'completion' && newState.completion) {
        newState.scheduled = false;
      }
      if (
        !newState.all &&
        !newState.completion &&
        !newState.freedEpisode3 &&
        !newState.print &&
        !newState.scheduled
      ) {
        newState.all = true;
      }

      return newState;
    });
  };

  const initFilterFlag = () => {
    setFilterFlag({
      all: true,
      completion: false,
      scheduled: false,
      freedEpisode3: false,
      print: false,
    });
  };

  return {
    initFilterFlag,
    onFilter,
  };
}

export type { FilterType };
export default useFilter;
