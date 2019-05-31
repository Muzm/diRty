import React from 'react';
import "../styleSheet/audio.scss";
import { connect } from "react-redux";
import axios from "axios";

import playListAction from '../actions/playList';
import Login from './login';

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
      playListId: '', // for mark current playList if show all update this.state.playList
      muted: true,
      dotLeft: 0,
      urlOfCuurentSong: '',
      autoPlay: false,
      random: false
    };

    this.audio = React.createRef();
  }

  async componentDidMount() {
    this.audio.current.volume = this.state.volume;
  }

  componentWillReceiveProps(props) {
    if(this.state.playListId !== props.playListId || props.playIndex !== this.state.playIndex) {
      // fix song dynamic url bug
      this.setState({
        playList: props.playList,
        playIndex: props.playIndex,
        playListId: props.playListId
      },
      this.getCurrentSongPlayUrl);
    }
  }

  async getCurrentSongPlayUrl() {
    // const vendor = window.location.href.split('/').slice(-1).pop() === "net" ? "netease" : "xiami";
    try {
      const { id } = this.state.playList[this.state.playIndex] || {};
      let url = id && await axios.get(`http://${apiConfig.api}/getSong?vendor=netease&id=${id}`, {
        timeout: 20000,
      });
      this.setState({
        urlOfCuurentSong: url.data.data[0].url
        // urlOfCuurentSong: `https://music.163.com/song/media/outer/url?id=${this.state.playList[this.state.playIndex].id}`
      });
    } catch(e) {
      console.log(e);
    }
  }

  nextSong() {
    if(this.state.random) {
      const random = Math.ceil((Math.random() * 10));
      this.props.PLAY_INDEX(this.state.playIndex + random > this.state.playList.length ? random : random + this.state.playIndex);
    } else {
      if(this.state.playIndex + 1 === this.state.playList.length) {
        this.props.PLAY_INDEX(0);
      } else {
        this.props.PLAY_INDEX(this.state.playIndex + 1);
      }
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
        <Login></Login>
        <div className="flex-c a-end ok">
          <div onClick={()=>{this.state.playList && this.previousSong()}}>Previous</div>
          <div className="flex j-start a-center clear-curs">
            <i className={`${this.state.random && 'random'} cur ran-con fas fa-random`} onClick={()=> {this.setState({random: !this.state.random})}}></i>
            <div className="cur" onClick={()=>{this.state.playList && this.nextSong()}}>Next</div>
          </div>
        </div>
          
        <div className="p-wraper flex f-start a-start">
          <audio 
            ref={this.audio} 
            src={this.state.urlOfCuurentSong} 
            // muted={this.muted} 
            onEnded={() => this.nextSong()} 
            autoPlay 
            controls
            controlsList="nodownload">
            Your browser does not support the <code>audio</code> element.
          </audio>
        </div>
      </div>
    );
  }
}

let fetchPlayList = (store) => {
  return {
    playList: store.list.playList,
    playIndex: store.list.playIndex,
    playListId: store.list.playListId
  };
}

// export default Player;
export default connect(
  fetchPlayList,
  playListAction
)(Player);