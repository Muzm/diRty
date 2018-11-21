import React from "react";
import "../styleSheet/doSome.css";

import Input from './input';
import List from './searchRes';

import axios from 'axios';
import apiConfig from "../apiConfig";

 class DoSome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: 0, // 0 网易 1 虾米
      result: [],
      limit: 30,
      offset: 0,
      type: 1,
      searchingKeyWord: '',
      searching: false,
      searched: false,
      trackCount: 0,
    }
  }

  searching(showMore = false ,keyword = this.state.searchingKeyWord) {
    this.setState({
      searching: true,
      searched: this.state.searchingKeyWord
    }, async ()=> {
      let result = keyword && 
      await axios(`http://${apiConfig.api}/search?keyword=${keyword}&type=${this.state.type}&vendor=${this.state.vendor}&limit=${this.state.limit}&offset=${this.state.offset}`)
      if(this.state.type === 1) {
        this.setState({
          result: showMore ? this.state.result.concat(result.data.result.songs) : result.data.result.songs,
          searching: false,
          trackCount: result.data.result.songCount
        });
      } else if(this.state.type === 10) {
        this.setState({
          result: showMore ? this.state.result.concat(result.data.result.albums) : result.data.result.albums,
          searching: false,
          trackCount: result.data.result.albumCount
        });
      }
    });
  }

  render() {
    return(
      <div className="do-some main-outter flex-c j-start">
        <div className="top-c">
          <Input searchingKeyWord={this.state.searchingKeyWord} type={this.state.type} setState={this.setState.bind(this)} searching={this.searching.bind(this)}></Input>
          <h2 className="curr-title">{this.state.searched ? `Search: ${this.state.searchingKeyWord}` : ''}</h2>
        </div>
        <div className="result-container">
          <List action={this.props.action} tracks={this.state.result}></List>
          {
            this.state.trackCount > 30 && this.state.searched && !this.state.searching && this.state.offset * 30 < this.state.trackCount &&
            (<div onClick={()=>{
                this.setState({
                  offset: this.state.offset + 1
                }, ()=> this.searching(true))
              }} className="a-track view-all-wap flex j-center">
              <div className="view-all">
                View more results
              </div>
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default DoSome;