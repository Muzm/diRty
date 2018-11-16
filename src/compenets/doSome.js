import React from "react";
import "../styleSheet/doSome.css";

import Input from './input';

 class DoSome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchingKeyword: '',
      currTitle: ''
    } 
  }

  render() {
    return(
      <div className="do-some flex-c just-start a-start">
        <h2 className="curr-title">{this.state.currTitle}</h2>
        <Input></Input>
      </div>
    )
  }
}

export default DoSome;