import React, { Component } from 'react';
import axios from "axios";

import Onetracks from './oneTrack';

 class Net extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      playList: [],
      songList: []
    }
  }

  async componentDidMount() {
    let netPlayList = await axios.get("http://127.0.0.1:3001/netList");
    
    console.log(netPlayList.data.playlist.tracks);
    let data = netPlayList.data.playlist.tracks;
    this.setState({
      playList: data,
      songList: data.map((item, index) => (<Onetracks key={index} name={item.name} id={item.id} ar={item.ar}></Onetracks>))
    });
    console.log(this.state.songList);
  }

  render () {
    return (
      <div className="netease">
        <ul className="flex-c flex-s align-s">
          {this.state.songList}
        </ul>
      </div>
    )
  }
}

export default Net