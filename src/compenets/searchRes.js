import React from 'react';
import Track from './oneTrack';

import { Link } from 'react-router-dom';
import { replaceResultTransformer } from 'common-tags';

class Result extends React.Component {
  constructor(props) {
    super(props);

  }

  artistsResults() {
    return (
      this.props.result.map((item, index)=>{
        return (
          <li className="flex" key={index}>
            <Link to={`/artist/${item.id}`}>
              <div className="artist-name">{item.name}</div>
            </Link>
          </li>
        );
      })
    );
  }

  trackResults() {
    return (
      this.props.result.map((item, index)=>{
        return (
          <Track onClick={()=> {
            this.props.action({
              playList: this.props.result,
              playIndex: index
            });
          }} key={item.id} dt={item.duration} trackName={item.name} id={item.id} ar={item.artists}></Track>
        );
      })
    );
  }
  
  albumResults() {
    return (
      this.props.result.map((item, index)=> {
        return (
          <li className="flex" key={index}>
            <Link to={`/album/${item.id}`}>
              <div>{item.name}</div>
            </Link>
            &nbsp;-&nbsp;
            <Link to={`/artist/${item.artists[0].id}`}>
              <div>{item.artists[0].name}</div>
            </Link>
          </li>
        );
      })
    );
  }

  useWhichOne() {
    if (this.props.type === 1) {
      return this.trackResults();
    } else if(this.props.type === 10) {
      return this.albumResults();
    } else {
      return this.artistsResults();
    }
  }

  render() {
    return (
      <ul className="result-u flex-c j-start a-start">
        {this.useWhichOne()}
      </ul>
    )
  }
}

export default Result;