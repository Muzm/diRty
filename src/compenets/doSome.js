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
      searched: false
    }
  }

  async searching(keyword) {
    this.setState({
      searching: true,
      searched: true
    });
    let result = keyword && 
    await axios(`http://${apiConfig.api}/search?keyword=${keyword}&type=${this.state.type}&vendor=${this.state.vendor}&limit=${this.state.limit}&offset=${this.state.offset}`)
    this.setState({
      result: result.data.result.songs,
      searching: false
    });
  }

  render() {
    return(
      <div className="do-some flex-c just-start a-start">
        <Input setState={this.setState.bind(this)} searching={this.searching.bind(this)}></Input>
        <h2 className="curr-title">{this.state.searched ? `Search: ${this.state.searchingKeyWord}` : ''}</h2>
        <div className="result-container">
          <List action={this.props.action} tracks={this.state.result}></List>
        </div>
      </div>
    )
  }
}

export default DoSome;