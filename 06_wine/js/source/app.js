'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Excel from './components/Excel';

var headers = localStorate.getItem('headers');
var data = localStorate.getItem('data');

if(!headers) {
  headers = ['タイトル', '年', '評価', 'コメント'];
  data = [['テスト', '2015', '3', 'hoge']];
}
ReactDOM.render(
   <div>
    <h1>
      <Logo /> Whinpadにようこそ！ 
    </h1>
    <Excel headers={headers} initialData={data} />
  </div>,
  document.getElementById('app')
);
