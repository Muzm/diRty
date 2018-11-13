import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import action from "../state/playList";
import List from "./oneList";
import "../styleSheet/index.css";
import DoSome from "./doSome";

import apiConfig from "../apiConfig"; // import your api config

 class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userPlayList: [],
      JSXList: []
    };
  }

  async componentDidMount() {
    let userPlayList = await axios.get(`http://${apiConfig.api}/userPlayList?uid=${348024701}`)
    let listDetail = userPlayList.data.playlist.map(async (item, index)=> {
      // let tracks = await axios.get(`http://${apiConfig.api}/listDetail?id=${item.id}&limit=10&offset=1`);
      return (
        <li key={index}>
          <List name={item.name} img={item.coverImgUrl} id={item.id} action={this.props.MODIFY_PLAYLIST}></List>
        </li>
      )
    });
    listDetail = await Promise.all(listDetail);
    this.setState({
      userPlayList: userPlayList.data.playlist,
      JSXList: listDetail
    });
  }

  render () {
    return (
      <div className="index-wrap flex">
        <div className="main-outter">
          <ul className="main-group flex-c">
            {this.state.JSXList}
          </ul>
        </div>
        <DoSome></DoSome>
      </div>
    );
  }
}

export default connect(
  null,
  action
)(Index);

// export default Index;