import { lazy } from 'react';

const _Index = import('./Index/Index');
const _Ranking = import('./Ranking/Ranking');
const _Error = import('./Error/Error');
const _NotFound = import('./Error/NotFound');

const Index = lazy(() => _Index);
const Ranking = lazy(() => _Ranking);
const Error = lazy(() => _Error);
const NotFound = lazy(() => _NotFound);

export { Index, Ranking, Error, NotFound };
