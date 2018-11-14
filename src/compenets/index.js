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
      scrollTop: 0
    };

  }

  async componentDidMount() {
    let userPlayList = await axios.get(`http://${apiConfig.api}/userPlayList?uid=${348024701}`)
    // let listDetail = userPlayList.data.playlist.map((item, index)=> {
    //   return (
    //     <li key={index}>
    //       <List srcoll={this.srcolling} name={item.name} img={item.coverImgUrl} id={item.id} action={this.props.MODIFY_PLAYLIST}></List>
    //     </li>
    //   );
    // });
    this.setState({
      userPlayList: userPlayList.data.playlist,
    });
  }

  render () {
    return (
      <div className="index-wrap flex">
        <div onScroll={(e)=> {this.setState({scrollTop: e.target.scrollTop})}} className="main-outter">
          <ul className="main-group flex-c">
            {this.state.userPlayList.map((item, index)=> {
              return (
                <li key={index}>
                  <List scrollTop={this.state.scrollTop} name={item.name} img={item.coverImgUrl} id={item.id} action={this.props.MODIFY_PLAYLIST}></List>
                </li>
              );
            })}
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