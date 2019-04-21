import React from 'react';
import ReactDOM from 'react-dom';
import './styleSheet/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function z() {
  setTimeout(z, 40);
  a.getByteFrequencyData(d);
  let s = [];
  d.forEach(v => s.push(l[Math.floor((v / 300) * 8)]));
  let t = document.title = s.join("");
  //eslint-disable-next-line
  window.history.replaceState(history.state, t, '#' + t);
}

let l = ["▁", "▂", "▃", "▅", "▆", "▇"];
let x = new AudioContext();
let a = x.createAnalyser();
a.fftSize = 32;
let d = new Uint8Array(16);
navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
  x.createMediaStreamSource(s).connect(a);
  z();
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
