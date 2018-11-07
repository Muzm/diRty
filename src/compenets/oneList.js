import React from "react";
import { connect } from 'react-redux';
import Track from './oneTrack';
import action from '../state/playList';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config


class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      JSXTracks: [],
      tracks: []
    };
  }

  async componentDidMount() {
    let tracks = await axios.get(`http://${apiConfig.api}/listDetail?id=${this.state.id}&limit=10`);
    this.setState({
      tracks: tracks.data.playlist.tracks,
      JSXTracks: tracks.data.playlist.tracks.map((item, index)=>{
        return (<Track onClick={()=> {
          this.props.MODIFY_PLAYLIST({
            playList: tracks.data.playlist.tracks,
            playIndex: index
          });
        }} key={index} trackName={item.name} id={item.id} ar={item.ar}></Track>)
      }),
      trackCount: tracks.data.playlist.trackCount
    });
  }

  render() {
    return (
      <div className="List-wrap">
        <div className="left flex j-end a-start">
          <img src={this.props.img}></img>
        </div>
        <div className="right flex-c j-start a-start">
          <div className="right-top">
            <div className="list-info">
              <h2 className="list-name">{this.props.name}</h2>
            </div>
            <div className="play">{this.state.trackCount}</div>
          </div>
          <div className="right-bottom">
            <ul>
              {this.state.JSXTracks}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// export default List;

export default connect(
  null,
  action
)(List);