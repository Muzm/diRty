import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Xiami from "./compenets/xiami";
import Net from "./compenets/net";
import Player from "./compenets/player"

import './styleSheet/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Xiami}></Route>
            <Route path="/xiami" component={Xiami}></Route>
            <Route path="/net" component={Net}></Route>
          </Switch>
          <Player />
        </div>
      </Router>
    );
  }
}

export default App;
