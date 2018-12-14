import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config

import List from "./oneList";

import errHandle from '../pinkyShiniybartster'; // error handle
import Loading from './loading';

class UserPlayList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPlayList: [],
      timeout: false,
      error: false,
      id: props.match.params.uid,
      isHomePage: localStorage.getItem('home_id') === props.match.params.uid,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    this.userPlayListFetcher();
  }

  async userPlayListFetcher() {
    try {
      let userPlayList = await axios.get(`http://${apiConfig.api}/userPlayList?uid=${this.props.match.params.uid}`, {
        timeout: 20000
      });

      this.setState({
        userPlayList: userPlayList.data.playlist,
        loading: false
      });
    } catch(e) {
      errHandle.requstErrorHandle(e, this.setState.bind(this));
    }
  }

  componentWillReceiveProps(props) {
    if(this.state.id !== props.match.params.uid) {
      this.setState({
        userPlayList: [],
        timeout: false,
        error: false,
        loading: true,
        isHomePage: localStorage.getItem('home_id') === props.match.params.uid,
        id: props.match.params.uid
      }, this.userPlayListFetcher);
    }
  }

  setAsHomePage() {
    localStorage.setItem('home_id', this.state.id);
    this.setState({isHomePage: true});
  }

  noErrorJSX() {
    return (
      <div className="flex-c">
        <div className="fix-this-user flex">
          <div className="fix" onClick={this.setAsHomePage.bind(this)}>{this.state.isHomePage ? 'Home now' : 'Set as home page'}</div>
          <i onClick={this.setAsHomePage.bind(this)} className={`fas ${this.state.isHomePage ? 'fa-kiss-wink-heart' : 'fa-meh'}`}></i>
        </div>
        {
          this.state.loading ? 
          <Loading width="150px"/> :
          <ul className="main-group flex-c">
            {this.state.userPlayList.map((item, index)=> {
              return (
                <li key={index}>
                  <List 
                    scrollTop={this.props.scrollTop} 
                    name={item.name} 
                    img={item.coverImgUrl} 
                    id={item.id} 
                    action={this.props.action}
                    playListId={this.props.playListId}></List>
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }

  render() {
    return errHandle.statusVisible(this.state.errorType, this.noErrorJSX())
  }
}

export default UserPlayList;