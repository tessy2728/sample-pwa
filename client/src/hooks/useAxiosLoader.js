import React from "react";
import fetchApi from '../services/fetchService';
const { useState, useCallback, useMemo, useEffect } = React;

const useAxiosLoader = () => {
    const [counter, setCounter] = useState(0);
  
    const inc = useCallback(() => setCounter(counter => counter + 1), [
      setCounter
    ]); // add to counter
    const dec = useCallback(() => setCounter(counter => counter - 1), [
      setCounter
    ]); // remove from counter
  
    const interceptors = useMemo(
      () => ({
        request: config => {
          inc();
          return config;
        },
        response: response => {
          dec();
          return response;
        },
        error: error => {
          dec();
          return Promise.reject(error);
        }
      }),
      [inc, dec]
    ); // create the interceptors
  
    useEffect(() => {
      // add request interceptors
      fetchApi.interceptors.request.use(interceptors.request, interceptors.error);
      // add response interceptors
      fetchApi.interceptors.response.use(interceptors.response, interceptors.error);
      return () => {
        // remove all intercepts when done
        fetchApi.interceptors.request.eject(interceptors.request);
        fetchApi.interceptors.request.eject(interceptors.error);
        fetchApi.interceptors.response.eject(interceptors.response);
        fetchApi.interceptors.response.eject(interceptors.error);
      };
    }, [interceptors]);
    return [counter > 0];
  };

  export default useAxiosLoader;