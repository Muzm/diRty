import React from "react";
import "../styleSheet/oneTrack.css";

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackName: props.trackName,
      id: props.id,
      ar: props.ar
    }
  }

  render() {
    return (
      <li className="a-track flex">
        <div className="track" onClick={this.props.onClick}>
          <span>{this.state.trackName}</span>
        </div>
        
        <div className="ar">
        -<span>{this.state.ar[0].name}</span>
        </div>
      </li>
    )
  }
}

export default Track;