import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig"; // import your api config

import List from "./oneList";
import Loading from './loading';

import errHandle from '../pinkyShiniybartster'; // error handle

class ArtistAlbums extends React.Component {
  constructor(porps) {
    super(porps);

    this.state = {
      artistAlbums: [],
      offset: 0,
      name: '',
      albumSize: 0,
      errorType: 0,
      id: porps.match.params.id,
      loading: false,
      showMoreLoading: false
    }
  }
  
  componentDidMount() {
    this.setState({loading: true});
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
        loading: true,
        showMoreLoading: false,
        id: props.match.params.id
      }, () => this.albumFetcher(5));
    }
  }

  async albumFetcher(limit, offset = 0) {
    try {
      // get artist aulbums
      let artistAlbums = await axios.get(`http://${apiConfig.api}/artist/album?id=${this.props.match.params.id}&limit=${limit}&offset=${offset}`,{
        timeout: 20000
      }); 
      this.setState({
        artistAlbums: offset !== 0 ? this.state.artistAlbums.concat(artistAlbums.data.hotAlbums) : artistAlbums.data.hotAlbums,
        name: artistAlbums.data.artist.name,
        albumSize: artistAlbums.data.artist.albumSize,
        offset: offset,
        loading: false,
        showMoreLoading: false
      });
    } catch(e) {
      errHandle.requstErrorHandle(e, this.setState.bind(this));
    }
  }

  showMoreLoading() {
    let currAlbums = this.state.artistAlbums.map((item, index)=> {
      return (
        <li key={index}>
          <List 
            scrollTop={this.props.scrollTop} 
            name={item.name}
            img={item.picUrl} 
            id={item.id} 
            action={this.props.action} 
            isAlbum={true}
            playListId={this.props.playListId}></List>
        </li>
      );
    });

    return currAlbums
  }

  showMoreUbtnDiaply() {
    if(this.state.albumSize > 5 && (this.state.offset + 1) * 5 < this.state.albumSize) {
      return (<li 
                onClick={() => {
                  this.setState({showMoreLoading: true});
                  this.albumFetcher(5, this.state.offset + 1);
                }}
                className={`a-track view-all-wap flex j-center ${this.state.showMoreLoading && 'pevent-hover'}`}>
                <div className="view-all">
                  {this.state.showMoreLoading ? <Loading width="150px"/> : `View more albums`}
                </div>
              </li>);
    }
  }

  noErrorJSX() {
    return (
      <div>
        <h2 className='italic epAlbums'>{this.state.name}'s EP and Albums <span className="totle-album">Total {this.state.albumSize} lists</span></h2>
        {
          this.state.loading ? 
          <Loading width="150px"/> :
          <ul className="main-group flex-c">
            {this.showMoreLoading()}
            {this.showMoreUbtnDiaply()}
          </ul>
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          errHandle.statusVisible(this.state.errorType, this.noErrorJSX())
        }
      </div>
    );
  }
}

export default ArtistAlbums;