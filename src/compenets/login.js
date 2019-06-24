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
      password: '',
      liked: false // is liked current song
    };
  }

  async login() {
    try {
      const res = await axios(`http://${apiConfig.api}/login`, {
        method: "POST",
        data: {
          phone: this.state.phone,
          password: this.state.password
        },
        withCredentials: true
      });
      
      if(res.data.loginType === 1) {
        console.log('res');
        localStorage.setItem('uid', res.data.account.id);
      }
    } catch(e) {
      console.log(`${e} login function: login.js 23`);
    }
  }

  likeSong = async () => {
    if(this.props.currentSongId) {
      if(!JSON.parse(localStorage.getItem('loginExpired'))) {
        if(!this.state.liked) {
          try {
            const res = await axios.get(`http://${apiConfig.search}/like?id=${this.props.currentSongId}`, {
              withCredentials: true
            });
            const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || {};
            const toSave = Object.assign(likedSongs, {
              [this.props.currentSongId]: this.props.currentSongId
            });
            localStorage.setItem('likedSongs', JSON.stringify(toSave));
            console.log(res);
          } catch(e) {
            console.log(`${e} likeSong function: login.js 43`);
          }
        }
      } else {
        console.log('Login Expired');
      }
    }
  };

  checkLoginStatus = async () => {
    try {
      const res = await axios.get(`http://${apiConfig.search}/login/status`, {
        withCredentials: true
      });
      localStorage.setItem('loginExpired', res.data.bindings[0]["expired"]);
      return res.data.bindings[0]["expired"]; // true needs login false no needs login
    } catch(e) {
      console.log(`${e} checkLoginStatus function: login.js 67`);
    }
  }

  async syncLikeList() {
    const uid = localStorage.getItem('uid');
    const isExpired = JSON.parse(localStorage.getItem('loginExpired'));
    if(uid && !isExpired){
      try {
        const res = await axios.get(`http://${apiConfig.search}/likelist?uid=${uid}`, {
            withCredentials: true
          }
        );

        if(res.data.code === 200) {
          let ids = res.data.ids;
          let toSave = {};
          ids.forEach(id => {
            toSave = Object.assign(toSave, {[id]: id})
          });
          localStorage.setItem('likedSongs', JSON.stringify(toSave));
        } else {
          console.log("can't sync like list");
        }
      } catch(e) {
        console.log(`${e} suncLikeList fucntion: login.js 79`);
      }
    }
  }

  inputEnter = (e) => {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  async componentDidMount() {
    await this.checkLoginStatus(); // 顺序执行 先检查登陆状态再同步喜欢歌曲列表
    await this.syncLikeList();
  }
  
  componentWillReceiveProps({ currentSongId }) {
    const isSaved = JSON.parse(
      localStorage.getItem('likedSongs') || '{}'
    )[currentSongId];
    this.setState({ liked: isSaved });
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
        <Like like={this.likeSong} liked={this.state.liked}></Like>
        
      </div>
    )
    
  }
}

export default Login;