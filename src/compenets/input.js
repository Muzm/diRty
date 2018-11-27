import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [
        {
          name: 'Track',
          type: 1,
        }, 
        {
          name: 'Album',
          type: 10
        },
        {
          name: 'Artist',
          type: 100
        }
      ]
    }
  }

  inputEnter(e) {
    if (e.keyCode === 13 && (this.props.searchingKeyWord !== this.props.searched.keyword || this.props.type !== this.props.searched.type)) {
      this.props.searching(); // 执行搜索
    }
  }

  render() {
    return (
      <div className="input-c-wrap flex j-start a-start">
        <input placeholder="That" value={this.props.searchingKeyWord} 
          onKeyDown={ e => this.inputEnter(e)} 
          onChange={ e => 
            this.props.setState({
              searchingKeyWord: e.target.value,
            })
          }
        />
        <div className="type flex">
          &nbsp;Is&nbsp;
          {
            this.state.types.map((item)=>
              (<div 
                key={item.name} 
                onClick={() => this.props.typeChange(item.type)}
                className={`type-item ${this.props.type === item.type && 'active'}`}>
                {item.name}
              </div>)
            )
          }
        </div>
      </div>
    )
  }
}

export default Input;