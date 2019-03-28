import React, { Component } from 'react';
import { connect } from "react-redux";
import action from "../actions/playList";
import "../styleSheet/index.css";
import DoSome from "./doSome";
import debounce from 'lodash.debounce';

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

import UserPlayList from './userPlayLists';
import ArtistAlbums from './artistAlbums';
import AlbumDetail from './albumDetail';
import Player from "./player";

 class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      List2Render: [],
      scrollTop: 0,
      doSomeIsSlide: false
    };
    
    this.scrollTopDebounce = debounce((e)=> {
      this.setState({
        scrollTop: e.target.scrollTop 
      });
    }, 300);
  }

  componentRe(target) {
    return (
      <target.target 
        {...target.props} 
        action={this.props.MODIFY_PLAYLIST} 
        playListId={this.props.playListId} 
        scrollTop={this.state.scrollTop}
      />
    );
  }

  doSomeSwitch(state = null) {
    this.setState({
      doSomeIsSlide: state !== null ? !this.state.doSomeIsSlide : state
    });
  }

  render () {
    return (
      <Router>
        <div className="index-wrap flex">
        <Link to="/" className="goHome flex j-center a-center">
          <i className="fas fa-dove"></i>
        </Link>
        <div onScroll={(e)=> {
                      e.persist();
                      this.scrollTopDebounce(e);
                    }} className="main-outter">
          <Switch>
            <Route exact path="/f/user/:uid" render={(props) => this.componentRe({target: UserPlayList, props: props})}></Route>
            <Route path="/f/album/:id" render={(props)=> this.componentRe({target: AlbumDetail, props: props})}></Route>
            <Route path="/f/artist/:id" render={(props)=> this.componentRe({target: ArtistAlbums, props: props})}></Route>
            <Route exact path="/f/" render={() => (<Redirect to={`/f/user/${localStorage.getItem('home_id') || '348024701' }`}></Redirect>)}></Route>
            <Route exact path="/" render={() => (<Redirect to="/f/"></Redirect>)}></Route>
          </Switch>
        </div>
        <DoSome action={this.props.MODIFY_PLAYLIST} isSlideOut={this.state.doSomeIsSlide} doSomeSwitch={this.doSomeSwitch.bind(this, false)}></DoSome>
          <div className="doSomeSwitch" onClick={this.doSomeSwitch.bind(this)}>
            <i className={`fas fa-cat ${this.state.doSomeIsSlide ? 'rotate' : ''}`}></i>
          </div>
        <Player playListId={this.props.playListId}/>
      </div>
    </Router>
    );
  }
}

let returnProps = (store)=> {
  return {
    playListId: store.list.playListId
  };
}

export default connect(
  returnProps,
  action
)(Index);