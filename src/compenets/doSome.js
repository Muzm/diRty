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
      searched: {
        keyword: '',
        type: 0
      },
      trackCount: 0,
    }
  }

  async searching(showMore = false ,keyword = this.state.searchingKeyWord) {
    const resultSetter = (result, trackCount) =>{
      this.setState({
        result: showMore ? this.state.result.concat(result.data.result.songs) : result.data.result.songs,
        searching: false,
        trackCount: trackCount
      });
    };

    if(keyword) {
      this.setState({
        searching: true,
        searched: {keyword: this.state.searchingKeyWord, type: this.state.type}
      }, async ()=> {
        let result = await axios(`http://${apiConfig.api}/search?keyword=${keyword}&type=${this.state.type}&vendor=${this.state.vendor}&limit=${this.state.limit}&offset=${this.state.offset}`);
        if(this.state.type === 1) {
          resultSetter(result, result.data.result.songCount);
        } else if(this.state.type === 10) {
          resultSetter(result, result.data.result.albumCount);
        }
      });  
    }
  }

  showMoreHandleer() {
    this.setState({
      offset: this.state.offset + 1
    }, ()=> this.searching(true, this.state.searched));
  }

  render() {
    return(
      <div className="do-some main-outter flex-c j-start">
        <div className="top-c">
          <Input searchingKeyWord={this.state.searchingKeyWord} searched={this.state.searched} type={this.state.type} setState={this.setState.bind(this)} searching={this.searching.bind(this)}></Input>
          <h2 className="curr-title">{this.state.searched.keyword ? `Search: ${this.state.searchingKeyWord}` : ''}</h2>
        </div>
        <div className="result-container">
          <List action={this.props.action} type={this.state.type} tracks={this.state.result}></List>
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