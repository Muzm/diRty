import React from 'react';

import "../styleSheet/login.scss";

class Like extends React.Component {
  render() {
    return (
      <i onClick={this.props.like} className={`heart fas fa-heartbeat ${this.props.liked && 'liked'}`} title="Like Current Song"></i>
    )
  }
}

export default Like;