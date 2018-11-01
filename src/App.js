import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux';

import Xiami from "./compenets/xiami";
import Net from "./compenets/net";
import Player from "./compenets/player"

import './styleSheet/App.css';

let intialPLayInfo = {
  playList: [],
  playIndex: 0
};

let playInfo = (state = {}, action) => {
  switch(action.type) {
    case "MODIFY_PLAYLIST":
      return Object.assign({}, state, {playList: action.value, playIndex: state.playIndex})
    case "PLAY_INDEX":
      return Object.assign({}, state, {playIndex: action.value, playList: state.playList})
    default:
      return state
  }
};

let store = createStore(
  playInfo, 
  intialPLayInfo
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Xiami} playList={[]}></Route>
              <Route path="/xiami" component={Xiami}></Route>
              <Route path="/net" component={Net}></Route>
            </Switch>

            <Player />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
