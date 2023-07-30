const getQueryParam = (search: string) => {
  const urlSearchParams = new URLSearchParams(search);
  return urlSearchParams.get('genre') || '';
};

export { getQueryParam };
