import React from 'react';
import Track from './oneTrack';

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: props.tracks
    }
  }

  render() {
    return (
      <ul className="result-u flex-c j-start a-start">
        {
          this.props.tracks.map((item, index)=>{
            return (
              <Track onClick={()=> {
                this.props.action({
                  playList: this.props.tracks,
                  playIndex: index
                });
              }} key={item.id} dt={item.duration} trackName={item.name} id={item.id} ar={item.artists}></Track>
            )
          })
        }
      </ul>
    )
  }
}

export default Result;