import type { ComicRankItem } from '@src/pages/Ranking/hooks/useGetRanking';

import style from './style.module.scss';
import Arrow from '@src/components/Arrow/Arrow';

type Props = {
  index: number;
  comicRankItem: ComicRankItem;
};

const PERIOD = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

function ListItem({ index, comicRankItem }: Props) {
  const isCompleted = comicRankItem.contentsState === 'completed';
  const isValidPeriod =
    !isCompleted &&
    Array.isArray(comicRankItem.schedule.periods) &&
    comicRankItem.schedule.periods.length > 0 &&
    typeof PERIOD[comicRankItem.schedule.periods[0]] === 'string';
  const changedRank = comicRankItem.previousRank - comicRankItem.currentRank;

  return (
    <div className={style.container}>
      <img
        className={style.thumbnail}
        src={comicRankItem.thumbnailSrc}
        alt={`thumbnail-${index}`}
      ></img>
      <div className={style.rank}>
        <div className={style.currentRank}>{comicRankItem.currentRank}</div>
        {changedRank !== 0 && (
          <div className={style.compareRank}>
            {changedRank > 0 ? (
              <Arrow direction='up' />
            ) : (
              <Arrow direction='down' />
            )}
            <span>{Math.abs(changedRank)}</span>
          </div>
        )}
      </div>
      <div className={style.info}>
        <div className={style.title}>{comicRankItem.title}</div>
        <div className={style.artist}>
          {comicRankItem.artists.map(({ name, role }, idx) => {
            const isVisibleRole =
              role === 'writer' || role === 'painter' || role === 'scripter';
            if (isVisibleRole) {
              return (
                <div key={`${name}-${idx}`}>
                  {name}
                  <span></span>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div>{comicRankItem.freedEpisodeSize}화 무료</div>
        {isCompleted && <div>완결</div>}
        {isValidPeriod && (
          <div>매주 {PERIOD[comicRankItem.schedule.periods[0]]} 연재</div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
