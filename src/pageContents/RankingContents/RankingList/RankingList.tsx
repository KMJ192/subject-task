import { useRecoilValue } from 'recoil';
import {
  rankingFilterFlagAtom,
  rankingListInfoAtom,
} from '@src/store/pages/Ranking/atom';

import ListItem from '../ListItem/ListItem';

import style from './style.module.scss';

function RankingList() {
  const { rankingList } = useRecoilValue(rankingListInfoAtom);
  const filterFlag = useRecoilValue(rankingFilterFlagAtom);

  if (filterFlag.all) {
    return rankingList.map((d, index) => {
      return (
        <li key={`${d.id}-${index}`} className={style.item}>
          <ListItem index={index} comicRankItem={d} />
        </li>
      );
    });
  }

  return rankingList
    .filter(({ contentsState, freedEpisodeSize, isPrint }) => {
      if (filterFlag.completion && contentsState !== 'completed') return false;

      if (filterFlag.scheduled && contentsState !== 'scheduled') return false;

      if (filterFlag.freedEpisode3 && freedEpisodeSize < 3) return false;

      if (filterFlag.print && !isPrint) return false;

      return true;
    })
    .map((d, index) => {
      return (
        <li key={`${d.id}-${index}`} className={style.item}>
          <ListItem index={index} comicRankItem={d} />
        </li>
      );
    });
}

export default RankingList;
