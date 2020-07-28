import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from "./serviceWorker";
import Home from './pages/home/home';
import {initializeFirebase, registerFCM} from './services/pushService';
import './index.css';

ReactDOM.render(<Home />, document.getElementById('app'))

initializeFirebase();
serviceWorker.register();