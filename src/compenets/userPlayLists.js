import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config

import List from "./oneList";

import errHandle from '../pinkyShiniybartster'; // error handle

class UserPlayList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPlayList: [],
      timeout: false,
      error: false,
      id: props.match.params.uid
    }
  }

  async componentDidMount() {
    this.userPlayListFetcher();
  }

  async userPlayListFetcher() {
    try {
      let userPlayList = await axios.get(`http://${apiConfig.api}/userPlayList?uid=${this.props.match.params.uid}`, {
        timeout: 5000
      });

      this.setState({
        userPlayList: userPlayList.data.playlist
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
        id: props.id
      }, this.userPlayListFetcher);
    }
  }

  noErrorJSX() {
    return (
      <ul className="main-group flex-c">
        {this.state.userPlayList.map((item, index)=> {
          return (
            <li key={index}>
              <List scrollTop={this.props.scrollTop} name={item.name} 
              img={item.coverImgUrl} id={item.id} action={this.props.action}></List>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return errHandle.statusVisible(this.state.errorType, this.noErrorJSX())
  }
}

export default UserPlayList;