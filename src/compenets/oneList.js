import React from "react";
import Track from './oneTrack';
import axios from 'axios';

import "../styleSheet/oneList.scss";

import apiConfig from "../apiConfig"; // import your api config

import errHandle from '../pinkyShiniybartster'; // error handle
import Loading from './loading';

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
      angle: {top: 0},
      errorType: 0,
      loading: false,
      viweAllLoading: false
    };

    this.angle = React.createRef();
    this.list = React.createRef();
  }

  async componentDidMount() {
    this.setState({loading: true});
    this.props.isAlbum ? this.albumDetailFetcher(10) : this.trackFetcher(10);
  }

  componentWillReceiveProps(props) {
    if(this.state.id !== props.id) {
      this.setState({
        id: props.id,
        JSXTracks: [],
        tracks: [],
        visiableTRACKS: [],
        viewAll: false,
        trackCount: this.props.isAlbum ? this.props.size : 0,
        allFetched: false,
        angle: {top: 0},
        timeout: false,
        error: false,
        loading: true,
        viewAllLoading: false
      }, ()=> {
        this.props.isAlbum ? this.albumDetailFetcher(10) : this.trackFetcher(10);
      });
    }
  }

  countAngleTop() {
    if(this.props.scrollTop > this.list.current.offsetTop && this.props.scrollTop < (this.list.current.offsetHeight + this.list.current.offsetTop - 100)) {
      return {
        top: this.props.scrollTop - this.list.current.offsetTop + 'px'
      };
    }
  }

  async trackFetcher(limit = 'all', offset = 0) {
    try {
      let tracks = await axios.get(`http://${apiConfig.api}/listDetail?id=${this.state.id}&limit=${limit}&offset=${offset}`, {
        timeout: 20000
      });
      this.setState({
        tracks: tracks.data.playlist.tracks,
        trackCount: tracks.data.playlist.trackCount,
        viewAll: limit === 'all' ? true : false,
        visiableTRACKS: limit === 'all' ? tracks.data.playlist.tracks : tracks.data.playlist.tracks.slice(0, 10), // need fix
        allFetched: limit === 'all' ? true : false,
        loading: false,
        viewAllLoading: limit === 'all' ? false : this.state.viewAllLoading
      });
    } catch(e) {
      errHandle.requstErrorHandle(e, this.setState.bind(this));
    }
  }

  async albumDetailFetcher(limit = 'all', offset = 0) {
    try {
      let tracks = (await axios.get(`http://${apiConfig.api}/albumDetail?id=${this.state.id}&limit=${limit}&offset=${offset}`, {
        timeout: 20000
      })).data;
      this.setState({
        visiableTRACKS: tracks.songs,
        tracks: tracks.songs,
        trackCount: tracks.album.size,
        publishTime: tracks.album.publishTime,
        name: tracks.album.name,
        viewAll: limit === 'all',
        allFetched: limit === 'all',
        img: tracks.album.picUrl,
        loading: false,
        viewAllLoading: limit === 'all' ? false : this.state.viewAllLoading
      });
    } catch(e) {
      errHandle.requstErrorHandle(e, this.setState.bind(this));
    }
  }
  
  loadAllTracks() {
    if(this.state.viewAll) {
      this.setState({
        visiableTRACKS: this.state.tracks.slice(0, 10), 
        viewAll: false,
      }, ()=> this.list.current.scrollIntoView());
    } else if(this.state.allFetched) {
      this.setState({
        visiableTRACKS: this.state.tracks,
        viewAll: true,
      });
    } else {
      this.setState({viewAllLoading: true});
      this.props.isAlbum ? this.albumDetailFetcher('all') : this.trackFetcher('all');
    }
  }

  backToThePlaceWhereTheAllBegin () {
    this.setState({angleMove: false});
    this.loadAllTracks();
  }

  displayTracks() { // display tracks
    let tracks = this.state.visiableTRACKS.map((item, index) => {
      return (<Track onClick={()=> {
        this.props.action({
          playList: this.state.visiableTRACKS,
          playIndex: index
        });
      }} key={item.id} dt={item.dt} trackName={item.name} id={item.id} ar={item.ar} isAlbum={this.props.isAlbum}></Track>)
    });
    if(this.state.trackCount > 10) tracks.push(this.showAll());
    return tracks;
  }

  showAll() { // Show all button control aka View TrackCount tracks
    let toRender;
    if(this.state.viewAllLoading) {
      toRender = (<Loading width="50px"/>);
    } else {
      toRender = this.state.viewAll ? "Viwe less tracks" : `View ${this.state.trackCount} tracks`
    }

    return (<li key="More" onClick={()=>{this.loadAllTracks()}} className={ `${!this.state.viewAllLoading && 'a-track'} view-all-wap flex j-center`}>
            <div className="view-all">
              {toRender}
            </div>
          </li>);
  }

  loading() {
    return (
      <li style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        <Loading width="120px"/>
      </li>
    );
  }

  noErrorJSX() {
    return (
      <div ref={this.list} className="List-wrap flex">
        <div className="left flex-c j-start a-end">
          <img alt={this.state.name} src={this.props.img || this.state.img}></img>
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
                this.state.loading ? 
                this.loading() : 
                this.displayTracks()
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return errHandle.statusVisible(this.state.errorType, this.noErrorJSX())
  }
}

export default List;