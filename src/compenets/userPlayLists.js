import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config

import List from "./oneList";

class UserPlayList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPlayList: []
    }
  }

  async componentDidMount() {
    try {
      let userPlayList = await axios.get(`http://${apiConfig.api}/userPlayList?uid=${this.props.match.params.uid}`, {
        timeout: 5000
      });

      this.setState({
        userPlayList: userPlayList.data.playlist
      });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
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
}

export default UserPlayList;