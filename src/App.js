import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';

import Xiami from "./compenets/xiami";
import Net from "./compenets/net";
import Player from "./compenets/player"

import './styleSheet/App.css';

let playList = (state = [], action) => {
  switch(action.type) {
    case "MODIFY_PLAYLIST":
      return action.value
    default:
      return state
  }
}

let MODIFY_PLAYLIST = (value) => ({
  type: "MODIFY_PLAYLIST",
  value: value
});

let store = createStore(playList);

// store.dispatch(MODIFY_PLAYLIST([1,2,3]));

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
