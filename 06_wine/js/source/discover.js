'use strict';

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div stype={{padding: '20px'}}>
        <h1> コンポーネント一覧 </h1>
        <h2> Logo </h2>
        <div style={{ display: 'inline-block', background: 'purple'}}>
            <Logo />
        </div>
        // somthing write...
    </div>,
    document.getElementById('pad')
);
