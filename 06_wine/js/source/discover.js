'use strict';

import Button from './components/Button';
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
        <h2>Button</h2>
            <div>onClickが指定されたButton:<Button onClick={()=>alert('Click')}>Click</Button></div>
            <div>hrefが指定されたButton:<Button href="http://reactjs.com">Follow</Button></div>
            <div>クラス名が指定されたButton:<Button className="custom">Nothing</Button></div>
        // somthing write...
        <h2>Suggest</h2>
            <div><Suggest options={['eenie', 'meenie', 'miney', 'mo']} /></div>
    </div>,
    document.getElementById('pad')
);
