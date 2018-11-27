import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import action from "../state/playList";

import Onetracks from './oneTrack';

import apiConfig from "../apiConfig"; // import your api config

 class Net extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      playList: [],
      songList: [],
    };
  }

  async componentDidMount() {
    try {
      let netPlayList = await axios.get(`http://${apiConfig.api}/netList`, {
        timeout: 5000
      });
    
      let data = netPlayList.data.playlist.tracks;
      this.props.MODIFY_PLAYLIST(data);
      this.setState({
        playList: data,
        songList: data.map((item, index) => (<Onetracks onClick={() => {
          this.props.PLAY_INDEX(index);
        }} key={index} name={item.name} id={item.id} ar={item.ar}></Onetracks>))
      });
    } catch(e) {
      console.log(e);
    }
  }

  render () {
    return (
      <div className="netease">
        <ul className="flex-c flex-s align-s">
          {this.state.songList}
        </ul>
      </div>
    );
  }
}

export default connect(
  null,
  action
)(Net)