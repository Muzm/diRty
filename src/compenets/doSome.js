import React from "react";
import "../styleSheet/doSome.css";

 class DoSome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <div className="do-some flex-c just-start a-start">
        <input placeholder="Searching" />
      </div>
    )
  }
}

export default DoSome;