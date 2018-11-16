import React from 'react';


class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchingKeyWord: '',
      // searchingVendor: props.vendor, // 0 网易 1 虾米
    }
  }

  render() {
    return (
      <div className="input-c-wrap">
        <input placeholder="album or song" value={this.state.searchingKeyWord} 
        onKeyDown={(e)=>{e.keyCode === 13 && this.props.searching(this.state.searchingKeyWord)}} 
        onChange={(e)=> {
          this.setState({searchingKeyWord: e.target.value});
          // this.props.setState({searchingKeyWord: e.target.value})
          this.props.setState({
            searchingKeyWord: e.target.value,
            searched: false
          });
        }}/>
      </div>
    )
  }
}

export default Input;