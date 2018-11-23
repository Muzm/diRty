import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config

import List from "./oneList";

class ArtistAlbums extends React.Component {
  constructor(porps) {
    super(porps);

    this.state = {
      artistAlbums: [],
      offset: 0,
      name: '',
      albumSize: 0
    }
    
    this.params = new URLSearchParams(this.props.location.search);
  }
  
  componentDidMount() {
    this.albumFetcher(5);
  }

  async albumFetcher(limit, offset = 0) {
    let artistAlbums = await axios.get(`http://${apiConfig.api}/artist/album?id=${this.props.match.params.id}&limit=${limit}&offset=${offset}`); // 获取歌手专辑
    this.setState({
      artistAlbums: offset !== 0 ? this.state.artistAlbums.concat(artistAlbums.data.hotAlbums) : artistAlbums.data.hotAlbums,
      name: artistAlbums.data.artist.name,
      albumSize: artistAlbums.data.artist.albumSize,
      offset: offset
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}'s Albums <span className="totle-album">Total {this.state.albumSize} albums</span></h2>
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
      </div>
    );
  }
}

export default ArtistAlbums;