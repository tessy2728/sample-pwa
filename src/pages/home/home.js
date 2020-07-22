import React from 'react';
import fetchApi from '../../services/fetchService';
import useAxiosLoader from '../../hooks/useAxiosLoader';
import {Header} from './home.style';
const { useState, useEffect } = React;


const Home = () => {
    const [data, setData] = useState({});
    const [loading] = useAxiosLoader();
      
    useEffect(() => {
        fetchApi.get("https://jsonplaceholder.typicode.com/users/1").then(setData);
        // navigator.serviceWorker.controller.postMessage(data);
      }, [setData]);
    return (
        <>
        <Header><img src="dist/images/logo.png" className="logo"></img>PWA APP </Header>
        <main>
        {!loading &&<div>{data.data && `Hello ${data.data.name}`}!</div>}
        {loading &&<div>Loading...</div>}
        </main></>
    )
}

export default Home;