import React from "react";
import "../styleSheet/doSome.css";

import Input from './input';
import SearchResult from './searchRes';

import axios from 'axios';
import apiConfig from "../apiConfig";
import { EmptyError } from "rxjs";

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
      searched: {
        keyword: '',
        type: 0
      },
      count: 0,
    }
  }

  async searching(showMore = false ,keyword = this.state.searchingKeyWord) {
    
    const resultSetter = (result) =>{
      const res = result.result;
      // set current searched keyword type
      this.setState({
        searching: false,
        searched: {
          type: this.state.type,
          keyword: this.state.searchingKeyWord
        }
      });

      // recording the type to save result
      let emptyResult = toReturn => toReturn || []; // in SearchResult Component this.props.result must be a array to map
      if(this.state.searched.type === 1) {
        this.setState({
          result: showMore ? this.state.result.concat(emptyResult(res.songs)) : emptyResult(res.songs),
          searching: false,
          trackCount: res.songCount
        });
      } else if (this.state.searched.type === 10) {
        this.setState({
          result: showMore ? this.state.result.concat(emptyResult(res.albums)) : emptyResult(res.albums),
          searching: false,
          trackCount: res.albumCount
        });
      } else {
        this.setState({
          result: showMore ? this.state.result.concat(emptyResult(res.artists)) : emptyResult(res.artists),
          searching: false,
          trackCount: res.artistCount
        });
      }
    };

    if(keyword) {
      this.setState({searching: !showMore});
      let result = await axios(`http://${apiConfig.api}/search?keyword=${keyword}&type=${this.state.type}&vendor=${this.state.vendor}&limit=${this.state.limit}&offset=${this.state.offset}`);
      resultSetter(result.data);
    }
  }

  showMoreHandleer() {
    (this.state.offset * this.state.limit) < this.state.trackCount &&
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

  render() {
    return(
      <div className="do-some main-outter flex-c j-start">
        <div className="top-c">
          <Input 
            searchingKeyWord={this.state.searchingKeyWord} 
            searched={this.state.searched} 
            type={this.state.type}
            setState={this.setState.bind(this)} 
            typeChange={this.typeChange.bind(this)}
            searching={this.searching.bind(this)}/>
          <h2 className="curr-title">{this.state.searched.keyword ? `Result of ${this.state.searched.keyword}` : ''}</h2>
        </div>
        <div className="result-container">
          <SearchResult
            action={this.props.action}
            searching={this.state.searching}
            searched={this.state.searched}
            type={this.state.type}
            result={this.state.result}></SearchResult>
          {
            this.state.trackCount > 30 && // 搜索的结果数量大于 30 因为每页会显示30个结果
            this.state.searched.keyword && // 必须是搜索过的
            !this.state.searching && // 不在搜索的 searching 状态中
            this.state.offset * 30 < this.state.trackCount && // 显示的结果小于搜索结果数量
            (<div onClick={()=> this.showMoreHandleer()} className="a-track view-all-wap flex j-center">
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