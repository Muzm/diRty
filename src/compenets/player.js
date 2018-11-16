import React from 'react';
import "../styleSheet/audio.scss";
import { connect } from "react-redux";
import axios from "axios";

import action from "../state/playList";

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

    this.volumeSilde = React.createRef();
    this.volumeMap = this.volumeMap.bind(this);
    this.audio = React.createRef();
  }

  async componentDidMount() {
    this.setState({dotLeft: this.state.volume * this.volumeSilde.current.offsetWidth});
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
    const vendor = window.location.href.split('/').slice(-1).pop() === "net" ? "netease" : "xiami";
    const { id } = this.state.playList[this.state.playIndex] || {};
    let url = id && await axios.get(`http://${apiConfig.api}/getSong?vendor=${"netease"}&id=${id}`);
    this.setState({
      urlOfCuurentSong: url.data.url
    });
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
        <button onClick={()=>{this.previousSong()}}>
          Previous
        </button>
        <button onClick={()=>{this.nextSong()}}>
          Next
        </button>
        <div className="p-wraper flex f-start a-start">
          <audio ref={this.audio} src={this.state.urlOfCuurentSong} muted={this.muted} onEnded={() => this.nextSong()} onCanPlay={() => this.audio.play()} controls>
            Your browser does not support the <code>audio</code> element.
          </audio>
        </div>
        <div className="v-control" ref={this.volumeSilde} onClick={this.volumeMap}>
          <div className="dot" style={{left: this.state.dotLeft}}></div>
        </div>
      </div>
    );
  }
}

let fetchPlayList = (store) => {
  return {
    playList: store.playList,
    playIndex: store.playIndex
  };
}

// export default Player;
export default connect(
  fetchPlayList,
  action
)(Player);