import cacheService from '../services/cacheService';
import fetchApi from '../services/fetchService';
import React from 'react';
import useAxiosLoader from './useAxiosLoader';
const { useState, useEffect } = React;

const useAxios = (url) => {    
    const [data, setData] = useState([]);
    const [loading] = useAxiosLoader();

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            const cachedData  = await cacheService.readData(url);
            if (!navigator.onLine && cachedData) {
                const data = cachedData;
                setData(data);
            } else {
                fetchApi.get(url).then((data) => {
                    setData(data.data);
                    cacheService.writeData(url, data.data);
                });
            }
        };
        fetchData();
    }, [url]);

    return [data, loading];
};

export default useAxios;