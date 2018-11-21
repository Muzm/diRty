import React, { Component } from 'react';
import { connect } from "react-redux";
import action from "../state/playList";
import "../styleSheet/index.css";
import DoSome from "./doSome";
import debounce from 'lodash.debounce';

import UserPlayList from './userPlayLists';
import ArtistAlbums from './artistAlbums';

 class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      List2Render: [],
      scrollTop: 0
    };
    
    this.scrollTopDebounce = debounce((e)=> {
      this.setState({
        scrollTop: e.target.scrollTop 
      });
    }, 300);
  }

  render () {
    return (
      <div className="index-wrap flex">
        <div onScroll={(e)=> {
                        e.persist();
                        this.scrollTopDebounce(e);
                      }} className="main-outter">
          <ArtistAlbums action={this.props.MODIFY_PLAYLIST}
           scrollTop={this.state.scrollTop} aid={101996}></ArtistAlbums>
        </div>
        <DoSome action={this.props.MODIFY_PLAYLIST}></DoSome>
      </div>
    );
  }
}

export default connect(
  null,
  action
)(Index);