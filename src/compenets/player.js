import React from 'react';
import "../styleSheet/audio.scss";
import { connect } from "react-redux";
import axios from "axios";

import { SET_CURRENT_TIME } from "../actions/lyric";
import platListAction from '../actions/playList'
import Lyric from './lyric'

import apiConfig from "../apiConfig";// import your api config


 class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentBuffer: 0,
      lengthOfCurrentSong: 0,
      volume: localStorage.getItem("volume") || 1,
      playList: props.playList,
      playIndex: props.playindex,
      muted: true,
      dotLeft: 0,
      urlOfCuurentSong: '',
      autoPlay: false
    };

    // this.volumeSilde = React.createRef();
    this.audio = React.createRef();
    // this.dot = React.createRef();
  }

  async componentDidMount() {
    // this.setState({dotLeft: this.state.volume * this.volumeSilde.current.offsetWidth});
    this.audio.current.volume = this.state.volume;
  }

  componentWillReceiveProps(props) {
    this.setState({
      playList: props.playList,
      playIndex: props.playIndex,
    },
    this.getCurrentSongPlayUrl);
  }

  async getCurrentSongPlayUrl() {
    // const vendor = window.location.href.split('/').slice(-1).pop() === "net" ? "netease" : "xiami";
    try {
      const { id } = this.state.playList[this.state.playIndex] || {};
      let url = id && await axios.get(`http://${apiConfig.api}/getSong?vendor=netease&id=${id}`, {
        timeout: 20000
      });
      this.setState({
        urlOfCuurentSong: url.data.data[0].url
      });
    } catch(e) {
      console.log(e);
    }
  }

  nextSong() {
    if(this.state.playIndex + 1 === this.state.playList.length) {
      this.props.PLAY_INDEX(0);
    } else {
      this.props.PLAY_INDEX(this.state.playIndex + 1);
    }
  }

  volumeMap(e) {
    const volume = e.nativeEvent.layerX / this.volumeSilde.current.offsetWidth;
    this.setState({
      dotLeft: e.nativeEvent.layerX,
      volume: volume
    });

    localStorage.setItem("volume", volume);
    this.audio.current.volume = e.nativeEvent.layerX / this.volumeSilde.current.offsetWidth;
  }

  previousSong() {
    if((this.state.playIndex - 1) < 0) {
      this.props.PLAY_INDEX(this.state.playList.length - 1);
    } else {
      this.props.PLAY_INDEX(this.state.playIndex - 1);
    }
  }

  render () {
    return (
      <div className="player flex j-center a-center">
      <div class="flex-c a-end ok">
        <div onClick={()=>{this.state.playList && this.previousSong()}}>Previous</div>
        <div onClick={()=>{this.state.playList && this.nextSong()}}>Next</div>
      </div>
        
      <div className="p-wraper flex f-start a-start">
        <audio 
          ref={this.audio} 
          src={this.state.urlOfCuurentSong} 
          muted={this.muted} onEnded={() => this.nextSong()} 
          onTimeUpdate={() => this.props.onTimeUpdate(this.audio.current)} 
          autoPlay 
          controls>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
      {/* <Lyric /> */}
      </div>
    );
  }
}

let fetchPlayList = (store) => {
  return {
    playList: store.list.playList,
    playIndex: store.list.playIndex
  };
}

const mapDispathToProps = (dispath) => ({
  onTimeUpdate: audio => {
    dispath(SET_CURRENT_TIME(audio.currentTime))
  },
  PLAY_INDEX: index => {
    dispath(platListAction.PLAY_INDEX(index))
  }
})

// export default Player;
export default connect(
  fetchPlayList,
  mapDispathToProps
)(Player);