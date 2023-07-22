import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routerMap } from './RouterMap';
import { Index } from '@src/pages';

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routerMap.map(({ key, path, page }) => {
          return <Route key={key} path={path} element={page}></Route>;
        })}
        <Route path='*' element={<Index />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
