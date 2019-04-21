import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux';

import combine from './reducers/index';

import Index from "./compenets/index";

import './styleSheet/App.css';

let store = createStore(
  combine,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App flex j-center">
          <Index />
        </div>
      </Provider>
    );
  }
}

export default App;
