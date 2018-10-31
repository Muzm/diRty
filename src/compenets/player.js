import React from 'react';
import "../styleSheet/audio.scss";
import { connect } from "react-redux";
import MODIFY_PLAYLIST from "../state/playList"

 class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentBuffer: 0,
      lengthOfCurrentSong: 0,
      volume: 1,
      playList: props.playList,
      playIndex: 0,
      muted: true,
      dotLeft: 0
    }
    this.volumeSilde = React.createRef();
    this.volumeMap = this.volumeMap.bind(this);
    this.audio = React.createRef();
  }

  componentDidMount() {
    this.setState({
      dotLeft: this.state.volume * this.volumeSilde.current.offsetWidth
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      playList: props.playList
    });
  }

  nextSong() {
    if(this.state.playIndex + 1 === this.state.playList.length) {
      this.setState({
        playIndex: 0
      });
    } else {
      this.setState({
        playIndex: this.state.playIndex + 1
      });
    }
  }

  volumeMap(e) {
    this.setState({
      dotLeft: e.nativeEvent.layerX,
      volume: e.nativeEvent.layerX / this.volumeSilde.current.offsetWidth
    });
    this.audio.current.volume = e.nativeEvent.layerX / this.volumeSilde.current.offsetWidth;
  }

  previousSong() {
    if((this.state.playIndex - 1) < 0) {
      this.setState({
        playIndex: this.state.playList.length
      });
    } else {
      this.setState({
        playIndex: this.state.playIndex - 1
      });
    }
  }

  render () {
    return (
      <div className="player flex j-center a-start">
      <button onClick={()=>{this.previousSong()}}>
        Previous
      </button>
      <button onClick={()=>{this.nextSong()}}>
        Next
      </button>
      <button onClick={()=>{this.props.MODIFY_PLAYLIST(["https://m10.music.126.net/20181030094945/0ec42d3db332de5f908109b63dbdece5/ymusic/a432/cdd6/73a9/09860040cec3c89b2d43af39d98b8ba6.mp3", "https://m10.music.126.net/20181030095137/bf3709c40ee3042e334e74e9fc0e3be7/ymusic/278c/e898/64cc/032a5b83bacd041aa917e7f7b3db8a75.mp3", "https://m10.music.126.net/20181030095354/2012a8d8af202e4ed8f4eb6bb85419b2/ymusic/b2ee/88ca/1a41/006378012d7598ce3b98dd2aba332ef1.mp3", "https://m10.music.126.net/20181030095414/c9d593a8ac72318670ddaa5c4e1b916a/ymusic/9ab8/2a32/5adc/e0c3d1a8d473bbd50e6b199769bfae0c.mp3"])}}>
        Add Songs
      </button>
        <div className="p-wraper flex f-start a-start">
          <audio ref={this.audio} src={this.state.playList[this.state.playIndex]} muted={this.muted} onEnded={() => this.nextSong()} controls autoPlay>
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

let fetchPlayList = (state) => {
  console.log(state);
  return {
    playList: state
  };
}
// export default Player;
export default connect(
  fetchPlayList,
  { MODIFY_PLAYLIST }
)(Player);