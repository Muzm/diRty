import React, { Component } from 'react';
import axios from "axios";
// import { connect } from "react-redux";
// import action from "../state/playList";
import List from "./oneList";

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
          <List name={item.name} id={item.id}></List>
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
      <div className="index-wrap">
        <ul className="flex-c flex-s align-s">
          {this.state.JSXList}
        </ul>
      </div>
    );
  }
}

// export default connect(
//   null,
//   action
// )(Index);

export default Index;