import React from "react";
import "../styleSheet/doSome.css";

import Input from './input';
import SearchResult from './searchRes';

import errHandle from '../pinkyShiniybartster'; // error handle

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
      showMoreLoading: false,
      searched: {
        keyword: '',
        type: 0
      },
      count: 0,
      errorType: 0
    }
  }

  searching(showMore = false ,keyword = this.state.searchingKeyWord) {
    
    const resultSetter = (result) =>{
      const res = result.result;
      const isEmptyResult = toReturn => toReturn || []; // in SearchResult Component this.props.result must be a array to map

      let toSetResult = null;
      let toSetCount = 0;
      
      if(this.state.searched.type === 1) {
        toSetCount = res.songCount;
        toSetResult = showMore ? this.state.result.concat(isEmptyResult(res.songs)) : isEmptyResult(res.songs);
      } else if (this.state.searched.type === 10) {
        toSetCount = res.albumCount;
        toSetResult = showMore ? this.state.result.concat(isEmptyResult(res.albums)) : isEmptyResult(res.albums);
      } else if(this.state.searched.type === 100) {
        toSetCount = res.artistCount;
        toSetResult = showMore ? this.state.result.concat(isEmptyResult(res.artists)) : isEmptyResult(res.artists);
      } else if(this.state.searched.type === 1002) {
        toSetCount = res.userprofileCount;
        toSetResult = showMore ? this.state.result.concat(isEmptyResult(res.userprofiles)) : isEmptyResult(res.userprofiles);
      }

      this.setState({
        result: toSetResult,
        count: toSetCount,
        searching: false,
        showMoreLoading: false
      });
    };

    if(keyword) {
      // set current saerching keyword and type
      this.setState({
        searching: !showMore,
        showMoreLoading: showMore,
        searched: {
          type: this.state.type,
          keyword: this.state.searchingKeyWord
        }
      }, async ()=> {
        try {
          let result = await axios(`http://${apiConfig.search}/search?keywords=${keyword}&type=${this.state.type}&vendor=${this.state.vendor}&limit=${30}&offset=${this.state.offset * this.state.limit}`, {
            timeout: 20000
          });
          if(result.data) resultSetter(result.data); else this.setState({errorType: 2});
        } catch(e) {
          console.log(e);
        }
      });
    }
  }

  showMoreHandleer() {
    (this.state.offset * this.state.limit) < this.state.count &&
    this.setState({
      offset: this.state.offset + 1
    }, ()=> this.searching(true, this.state.searched.keyword));
  }

  typeChange(type) {
    this.setState({
      type: type,
      result: []
    }, this.searching);
  }

  goodStatusJSX() {
    return (
      <SearchResult
        action={this.props.action}
        searching={this.state.searching}
        searched={this.state.searched}
        type={this.state.type}
        result={this.state.result}
        count={this.state.count}
        offset={this.state.offset}
        showMoreHandleer={this.showMoreHandleer.bind(this)}
        showMoreLoading={this.state.showMoreLoading}>
        
      </SearchResult>
    )
  }

  render() {
  //  return errHandle.statusVisible(this.state.errorType, this.goodStatusJSX());
    return (
        <div className="do-some main-outter flex-c j-start">
          <div className="top-c">
            <Input 
              searchingKeyWord={this.state.searchingKeyWord} 
              searched={this.state.searched} 
              type={this.state.type}
              setState={this.setState.bind(this)} 
              typeChange={this.typeChange.bind(this)}
              searching={this.searching.bind(this)}/>
          </div>
          <div className="result-container">
            {errHandle.statusVisible(this.state.errorType, this.goodStatusJSX())}
          </div>
        </div>
    )
  }
}

export default DoSome;