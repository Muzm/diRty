import React from 'react';
import axios from 'axios';

import "../styleSheet/login.scss";

import Like from './like';

import apiConfig from "../apiConfig";// import your api config

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logining: true,
      phone: '',
      password: ''
    };
  }

  async login() {
    const res = await axios(`http://${apiConfig.api}/login`, {
      method: "POST",
      data: {
        phone: this.state.phone,
        password: this.state.password
      },
      withCredentials: true
    });
    
    if(res.likeType === 1) {
      console.log('logined');
    }
  }

  likeSong = async () => {
    console.log(this.props.currentSongId);
    if(this.props.currentSongId) {
      const res = axios.get(`http://${apiConfig.search}/like?id=${this.props.currentSongId}`, {
        withCredentials: true
      });
  
      console.log(res);
    }
  };

  inputEnter = (e) => {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  render() {
    return (
      <div className="login-container">
        {
          this.state.logining && 
          (
            <div className="login flex">
              <h4>login</h4>
              <div className="input-group flex flex-c">
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
              </div>
           </div>
          )
        }
        <div className="profile flex-c a-center">
          <img alt="avatar" className="avatar" src={require('../asset/deer.jpg')}></img>
          <p className="name">{'Login to Like'}</p>
        </div>
        <Like like={this.likeSong}></Like>
        
      </div>
    )
    
  }
}

export default Login;