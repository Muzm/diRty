import React from 'react';

import '../styleSheet/loading.css';

import gif from '../asset/giphy.gif';

class Loading extends React.Component {
  render() {
    return (
      <div style={{width: this.props.width, height: this.props.width}} className="flex j-start a-center">
        <img alt="Loading" className="loading" src={gif}/>
      </div>
    )
  }

}

export default Loading;