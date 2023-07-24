import { RecoilRoot } from 'recoil';
import RootRouter from './RootRouter/RootRouter';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Error } from './pages';

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <RecoilRoot>
        <RootRouter />
      </RecoilRoot>
    </ErrorBoundary>
  );
}

export default App;
