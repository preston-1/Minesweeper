import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import Info from './Info' 


import reportWebVitals from './reportWebVitals';

if(document.getElementById('info').addEventListener("click", function (){
  document.getElementById('res').style.display = "none";
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
  document.getElementById("stopClock").innerHTML = "";
  document.getElementById("winMessage").innerText = "";
  ReactDOM.render(
    <React.StrictMode>
      <Info />
    </React.StrictMode>,
    document.getElementById('root')
  );
}));

if(document.getElementById('SB').addEventListener("click",function (){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
  document.getElementById("stopClock").innerHTML = "";
  document.getElementById("winMessage").innerText = "";
  document.getElementById('boardSize').innerText = "6 7 8 S";
  ReactDOM.render(
    <React.StrictMode>
      <Board />
    </React.StrictMode>,
    document.getElementById('root')
  );
  document.getElementById('resCheck').innerText = "SB";
  document.getElementById('res').style.display = "block";
}));
  
if(document.getElementById('MB').addEventListener("click",function (){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
  document.getElementById("stopClock").innerHTML = "";
  document.getElementById("winMessage").innerText = "";
  document.getElementById('boardSize').innerText = "10 11 25 M";
  ReactDOM.render(
    <React.StrictMode>
      <Board />
    </React.StrictMode>,
    document.getElementById('root')
  );
  document.getElementById('resCheck').innerText = "MB";
  document.getElementById('res').style.display = "block";
}));

if(document.getElementById('LB').addEventListener("click",function (){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
  document.getElementById("stopClock").innerHTML = "";
  document.getElementById("winMessage").innerText = "";
  document.getElementById('boardSize').innerText = "13 20 55 L";
  ReactDOM.render(
    <React.StrictMode>
      <Board />
    </React.StrictMode>,
    document.getElementById('root')
  );
  document.getElementById('resCheck').innerText = "LB";
  document.getElementById('res').style.display = "block";
}));
if(document.getElementById('res').addEventListener("click", function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
  document.getElementById("stopClock").innerHTML = "";
  document.getElementById("winMessage").innerText = "";
    if(document.getElementById('resCheck').innerText == "SB"){
      document.getElementById('boardSize').innerText = "6 7 8 S";
      ReactDOM.render(
        <React.StrictMode>
          <Board />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    if(document.getElementById('resCheck').innerText == "MB"){
      document.getElementById('boardSize').innerText = "10 11 25 M";
      ReactDOM.render(
        <React.StrictMode>
          <Board />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    if(document.getElementById('resCheck').innerText == "LB"){
      document.getElementById('boardSize').innerText = "13 20 55 L";
      ReactDOM.render(
        <React.StrictMode>
          <Board />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }  
  }));





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
