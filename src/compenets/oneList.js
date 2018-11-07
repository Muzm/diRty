import React from "react";
import { connect } from 'react-redux';
import Track from './oneTrack';
import action from '../state/playList';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: props.tracks,
      JSXTracks: props.tracks.map((item, index)=>{
        return (<Track key={index} trackName={item.name} id={item.id} ar={item.ar}></Track>)
      }),
    };
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
            <div className="play">Play</div>
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

export default connect(
  null,
  action
)(List);