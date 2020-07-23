import React from 'react';
import useAxios from '../../hooks/useAxios';
import {Header} from './home.style';


const Home = () => {
    const [data, loading] = useAxios('https://jsonplaceholder.typicode.com/users/1');

    return (
        <>
        <Header><img src="images/logo.png" className="logo"></img>PWA APP </Header>
        <main>
        {!loading &&<div>{data && `Hello ${data.name}`}!</div>}
        {loading &&<div>Loading...</div>}
        </main></>
    )
}

export default Home;