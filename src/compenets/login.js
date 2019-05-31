import React from 'react';
import axios from 'axios';

import "../styleSheet/login.scss";

import apiConfig from "../apiConfig";// import your api config

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: true,
      phone: '',
      password: ''
    };
  }

  async login() {
    await axios()
  }

  inputEnter = (e) => {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  render() {
    return this.state.show 
    ? (<div className="login flex-c a-center">
        <h4>Login</h4>
        <input 
          type="text" 
          className="login-input username"  
          onKeyDown={this.inputEnter}
          onChange={ e => 
              this.setState({
                phone: e.target.value,
              })
          } 
          value={this.state.phone} 
          placeholder="Phone"></input>
        <input 
          type="password" 
          className="login-input password" 
          onKeyDown={this.inputEnter}
          onChange={ e => 
            this.setState({
              password: e.target.value,
            })
          } 
          value={this.state.password} 
          placeholder="Password"></input>
      </div>)
    : ''
  }
}

export default Login;