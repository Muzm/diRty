import React from 'react';
import axios from 'axios';

import apiConfig from "../apiConfig";

class Input extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchingKeyWord: '',
      searchingVendor: 0, // 0 网易 1 虾米
      searchingResult: {}
    }
  }

  async searching() {
    let result = this.state.searchingKeyWord && 
    await axios(`http://${apiConfig.api}/search?keyword=${this.state.searchingKeyWord}&searchType=${1}`)
    console.log(result);
  }

  render() {
    return (
      <div className="input-c-wrap">
        <input placeholder="album or song" value={this.state.searchingKeyWord} 
        onKeyDown={(e)=>{e.keyCode === 13 && this.searching()}} 
        onChange={(e)=> {this.setState({searchingKeyWord: e.target.value})}}/>
      </div>
    )
  }
}

export default Input;