import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routerMap } from './RouterMap';
import { Index } from '@src/pages';
import PageTemplate from '@src/components/PageTemplate/PageTemplate';

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routerMap.map(({ key, path, page }) => {
          return (
            <Route
              key={key}
              path={path}
              element={<PageTemplate>{page}</PageTemplate>}
            ></Route>
          );
        })}
        <Route path='*' element={<Index />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
