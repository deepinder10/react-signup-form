const useFetch = () => {
  const doFetch = async (url, options) => {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      // if status code of API isn't 200 we consider 
      // it as error and send back the error
      if (res.status !== 200) {
        return { error: json };
      }
      return { response: json };
    } catch (e) {
      // if there is any error
      return { error: e };
    }
  };
  return doFetch;
};
export default useFetch;
