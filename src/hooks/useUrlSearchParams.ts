import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  url: string;
};

function useUrlSearchParams({ url }: Props) {
  const location = useLocation();
  const [queryParam, setQueryParam] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const param = urlSearchParams.get(url) ?? '';

    setQueryParam(param);
  }, [location.search]);

  return {
    queryParam,
  };
}

export default useUrlSearchParams;
