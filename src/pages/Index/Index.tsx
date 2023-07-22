import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRE, URL } from '@src/RootRouter/url';

function Index() {
  const nav = useNavigate();

  useEffect(() => {
    nav(`${URL.ranking}?genre=${GENRE[0]}`);
  }, []);

  return <div>Loading...</div>;
}

export default Index;
