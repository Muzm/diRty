import React, { Component } from 'react';
import { connect } from "react-redux";
import action from "../actions/playList";
import "../styleSheet/index.css";
import DoSome from "./doSome";
import debounce from 'lodash.debounce';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserPlayList from './userPlayLists';
import ArtistAlbums from './artistAlbums';
import AlbumDetail from './albumDetail';

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

  componentRe(target) {
    return (
      <target.target {...target.props} action={this.props.MODIFY_PLAYLIST} scrollTop={this.state.scrollTop}/>
    );
  }

  render () {
    return (
      <div className="index-wrap flex">
        <div onScroll={(e)=> {
                        e.persist();
                        this.scrollTopDebounce(e);
                      }} className="main-outter">
           <Router>
             <Switch>
              <Route exact path="/user/:uid" render={(props) => this.componentRe({target: UserPlayList, props: props})}></Route>
              <Route path="/album" render={(props)=> this.componentRe({target: AlbumDetail, props: props})}></Route>
              <Route path="/artist" render={(props)=> this.componentRe({target: ArtistAlbums, props: props})}></Route>
             </Switch>
           </Router>
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