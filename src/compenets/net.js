import React, { Component } from 'react';
import axios from "axios";

 class Net extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      playList: []
    }
  }

  async componentDidMount() {
    let netPlayList = await axios.get("http://127.0.0.1:3001/netList");
    
    console.log(netPlayList.data.playlist.tracks);
    this.setState({
      playList: netPlayList.data.playlist.tracks
    });
  }

  render () {
    return (
      <div>NET!</div>
    )
  }
}

export default Net