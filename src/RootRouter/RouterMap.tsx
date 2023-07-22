import { URL } from './url';
import { Index, Ranking } from '@src/pages';

type RouterMap = {
  key: string;
  path: string;
  page: React.ReactNode;
};

const routerMap: Array<RouterMap> = [
  {
    key: 'index',
    path: URL.index,
    page: <Index />,
  },
  {
    key: 'ranking',
    path: URL.ranking,
    page: <Ranking />,
  },
];

export { routerMap };
export type { RouterMap };
