const useFetch = () => {
  const doFetch = async (url, options) => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (res.status !== 200) {
        return { error: json };
      }
      return { response: json };
    } catch (e) {
      return { error: e };
    }
  };
  return doFetch;
};
export default useFetch;
