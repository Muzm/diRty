import React from 'react';

import List from "./oneList";


class AlbumDetail extends React.Component {
  constructor(props) {
    super(props);

    this.params = new URLSearchParams(this.props.location.search);
  }

  render() {
    return (
      <div className="album-detail">
        <List scrollTop={this.props.scrollTop} action={this.props.action} id={this.props.match.params.id} isAlbum={true}></List>
      </div>
    )
  }
}

export default AlbumDetail;