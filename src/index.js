import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from "./serviceWorker";
import Home from './pages/home/home';
import './index.css';

ReactDOM.render(<Home />, document.getElementById('app'))

serviceWorker.register();