import React from "react";
import "../styleSheet/oneTrack.css";
import { Link } from 'react-router-dom';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackName: props.trackName,
      id: props.id,
      ar: props.ar,
      dt: props.dt,
      duration: `${Math.round(this.props.dt / 60000)}:${this.props.dt % 60 > 10 ? this.props.dt % 60 : "0" + this.props.dt % 60}`
    }
  }

  render() {
    return (
      <li className="a-track flex">
        <div className="track no-wrap-eli" onClick={this.props.onClick} title={this.state.trackName}>
          <span>{this.state.trackName}</span>
        </div>
          
        <div className="ar no-wrap-eli" title={this.state.ar[0].name}>
          &nbsp;-&nbsp;
          {
            !this.props.isAlbum &&
            <Link className="link" to={`/artist/${this.state.ar[0].id}`}>{this.state.ar[0].name} &nbsp;</Link>
          }
        </div>

        <div title={this.state.duration} className="duration">{this.state.duration}</div>
      </li>
    )
  }
}

export default Track;