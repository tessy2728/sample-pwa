import React, {useState} from 'react';
import useAxios from '../../hooks/useAxios';
import {Header, FloatingIcon} from './home.style';
import {subscribePush} from '../../services/pushService';

const Home = () => {
    const [data, loading] = useAxios('https://jsonplaceholder.typicode.com/users/1');
    const [pushStatus, setPushStatus] = useState(false);

    const togglePushSubscription = () => {
        subscribePush();
    }

    return (
        <>
        <Header><img src="images/logo.png" className="logo"></img>PWA APP </Header>
        <main>
        {!loading &&<div>{data && `Hello ${data.name}`}!</div>}
        {loading &&<div>Loading...</div>}
        <FloatingIcon status={pushStatus} onClick={togglePushSubscription}>
        <i className='fas fa-bell' aria-hidden="true"></i>
        </FloatingIcon>
        </main>
        </>
    )
}

export default Home;