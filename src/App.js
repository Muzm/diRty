import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux';

import combine from './reducers/index';

import Index from "./compenets/index";
import Player from "./compenets/player"

import './styleSheet/App.css';

let store = createStore(combine);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App flex j-center">
          <Index></Index>
          <Player/>
        </div>
      </Provider>
    );
  }
}

export default App;
