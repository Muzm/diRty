import React from 'react';

import List from "./oneList";

class AlbumDetail extends React.Component {
  render() {
    return (
      <div className="album-detail">
        <List 
          scrollTop={this.props.scrollTop} 
          action={this.props.action} 
          id={this.props.match.params.id} 
          isAlbum={true}
          playListId={this.props.playListId}></List>
      </div>
    )
  }
}

export default AlbumDetail;