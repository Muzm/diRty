import React from "react";
import Track from './oneTrack';
import axios from 'axios';

import "../styleSheet/oneList.scss";

import apiConfig from "../apiConfig"; // import your api config
import { off } from "rsvp";


class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      JSXTracks: [],
      tracks: [],
      visiableTRACKS: [],
      viewAll: false,
      trackCount: this.props.isAlbum ? this.props.size : 0,
      allFetched: false,
      angle: {top: 0}
    };

    this.angle = React.createRef();
    this.list = React.createRef();
  }

  async componentDidMount() {
    this.props.isAlbum ? this.albumDetailFetcher(10) : this.trackFetcher(10);
  }

  countAngleTop() {
    if(this.props.scrollTop > this.list.current.offsetTop && this.props.scrollTop < (this.list.current.offsetHeight + this.list.current.offsetTop - 100)) {
      return {
        top: this.props.scrollTop - this.list.current.offsetTop + 'px'
      };
    }
  }

  async trackFetcher(limit = 'all', offset = 0) {
    let tracks = await axios.get(`http://${apiConfig.api}/listDetail?id=${this.state.id}&limit=${limit}&offset=${offset}`);
    this.setState({
      tracks: tracks.data.playlist.tracks,
      trackCount: tracks.data.playlist.trackCount,
      viewAll: limit === 'all' ? true : false,
      visiableTRACKS: limit === 'all' ? tracks.data.playlist.tracks : tracks.data.playlist.tracks.slice(0, 10), // need fix
      allFetched: limit === 'all' ? true : false
    });
  }

  async albumDetailFetcher(limit = 'all', offset = 0) {
    let tracks = (await axios.get(`http://${apiConfig.api}/albumDetail?id=${this.props.id}&limit=${limit}&offset=${offset}`)).data;
    this.setState({
      visiableTRACKS: tracks.songs,
      tracks: tracks.songs,
      trackCount: tracks.album.size,
      publishTime: tracks.album.publishTime,
      name: tracks.album.name,
      viewAll: limit === 'all' ? true : false,
      allFetched: limit === 'all' ? true : false,
      img: tracks.album.picUrl
    });
  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
  }
  
  loadAllTracks() {
    if(this.state.viewAll) {
      this.setState({
        visiableTRACKS: this.state.tracks.slice(0, 10), 
        viewAll: false
      }, ()=> this.list.current.scrollIntoView());
    } else if(this.state.allFetched) {
      this.setState({
        visiableTRACKS: this.state.tracks,
        viewAll: true
      });
    } else {
      this.props.isAlbum ? this.albumDetailFetcher('all') : this.trackFetcher('all');
    }
  }

  backToThePlaceWhereTheAllBegin () {
    this.setState({angleMove: false});
    this.loadAllTracks();
  }

  render() {
    return (
      <div ref={this.list} className="List-wrap flex">
        <div className="left flex-c j-start a-end">
          <img src={this.props.img || this.state.img}></img>
          {
            this.state.viewAll && <div ref={this.angle} className="float-less">
              <i onClick={()=>{this.backToThePlaceWhereTheAllBegin()}} style={this.state.viewAll && this.countAngleTop()} className="fas fa-angle-up angle"></i>
            </div>
          }
        </div>
        <div className="right flex-c j-start a-start">
          <div className="right-top">
            <div className="list-info">
              <h2 className="list-name">{this.props.name || this.state.name}</h2>
            </div>
          </div>
          <div className="right-bottom">
            <ul>
              {
                this.state.visiableTRACKS.map((item, index) => {
                  return (<Track onClick={()=> {
                    this.props.action({
                      playList: this.state.visiableTRACKS,
                      playIndex: index
                    });
                  }} key={item.id} dt={item.dt} trackName={item.name} id={item.id} ar={item.ar}></Track>)
                })
              }
              {
                this.state.trackCount > 10 && 
                (<li onClick={()=>{this.loadAllTracks()}} className="a-track view-all-wap flex j-center">
                  <div className="view-all">
                    {this.state.viewAll ? "Viwe less tracks" : `View ${this.state.trackCount || "loading"} tracks`}
                  </div>
                </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default List;