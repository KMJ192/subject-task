import { useEffect, useState } from 'react';

type Props = {
  url: string;
};

function useUrlSearchParams({ url }: Props) {
  const [queryParam, setQueryParam] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    setQueryParam(urlSearchParams.get(url) ?? '');
  }, []);

  return {
    queryParam,
  };
}

export default useUrlSearchParams;
