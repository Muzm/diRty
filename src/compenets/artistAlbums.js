import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config

import List from "./oneList";

import errHandle from '../pinkyShiniybartster'; // error handle

class ArtistAlbums extends React.Component {
  constructor(porps) {
    super(porps);

    this.state = {
      artistAlbums: [],
      offset: 0,
      name: '',
      albumSize: 0,
      timeout: false,
      error: false,
      id: porps.match.params.id
    }
  }
  
  componentDidMount() {
    this.albumFetcher(5);
  }

  componentWillReceiveProps(props) {
    if(this.state.id !== props.match.params.id) {
      this.setState({ // clear previous artist albums
        artistAlbums: [],
        offset: 0,
        name: '',
        albumSize: 0,
        timeout: false,
        error: false,
        id: props.match.params.id
      }, () => this.albumFetcher(5));
    }
  }

  async albumFetcher(limit, offset = 0) {
    try {
      // get artist aulbums
      let artistAlbums = await axios.get(`http://${apiConfig.api}/artist/album?id=${this.props.match.params.id}&limit=${limit}&offset=${offset}`,{
        timeout: 5000
      }); 
      this.setState({
        artistAlbums: offset !== 0 ? this.state.artistAlbums.concat(artistAlbums.data.hotAlbums) : artistAlbums.data.hotAlbums,
        name: artistAlbums.data.artist.name,
        albumSize: artistAlbums.data.artist.albumSize,
        offset: offset
      });
    } catch(e) {
      errHandle.requstErrorHandle(e, this.setState.bind(this));
    }
  }

  noErrorJSX() {
    return (
    <div>
      <h2 className='italic'>{this.state.name}'s Albums <span className="totle-album">Total {this.state.albumSize} albums</span></h2>
      <ul className="main-group flex-c">
        {this.state.artistAlbums.map((item, index)=> {
          return (
            <li key={index}>
              <List scrollTop={this.props.scrollTop} name={item.name}
              img={item.picUrl} id={item.id} action={this.props.action} isAlbum={true}></List>
            </li>
          );
        })}
        {
          this.state.offset * 5 < this.state.albumSize && 
          (<li onClick={()=>{this.albumFetcher(5, this.state.offset + 1)}} className="a-track view-all-wap flex j-center">
            <div className="view-all">
              {`View more albums`}
            </div>
          </li>)
        }
      </ul>
    </div>)
  }

  render() {
    return (
      <div>
        {
          errHandle.statusVisible(this.state.timeout, this.state.error, this.noErrorJSX())
        }
      </div>
    );
  }
}

export default ArtistAlbums;