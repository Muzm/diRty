import React from 'react';
import Track from './oneTrack';

import { Link } from 'react-router-dom';

import Loading from './loading';

class Result extends React.Component {
  artistsResults() {
    return (
      this.props.result.map((item, index)=>{
        return (
          <li className="flex a-track" key={index}>
            <Link onClick={this.props.doSomeSwitch} className="result-text" to={`/f/artist/${item.id}`}>
              {item.name}
            </Link>
          </li>
        );
      })
    );
  }

  trackResults() {
    return (this.props.result.map((item, index)=> {
              return (
                <Track onClick={()=> {
                  this.props.action({
                    playList: this.props.result,
                    playIndex: index
                  });
                }} doSomeSwitch={this.props.doSomeSwitch} key={item.id} dt={item.duration} trackName={item.name} id={item.id} ar={item.artists}></Track>
              );
          }));
  }
  
  albumResults() {
    return (
      this.props.result.map((item, index)=> {
        return (
          <li className="flex a-track" key={index}>
            <Link onClick={this.props.doSomeSwitch} className="result-text" to={`/f/album/${item.id}`}>
              {item.name}
            </Link>
            &nbsp;-&nbsp;
            <Link onClick={this.props.doSomeSwitch} className="result-text arar" to={`/f/artist/${item.artists[0].id}`}>
              {item.artists[0].name}
            </Link>
          </li>
        );
      })
    );
  }

  userResults() {
    return (
      this.props.result.map((item, index)=>{
        return (
          <li className="flex a-track" key={index}>
            <Link onClick={this.props.doSomeSwitch} className="result-text" to={`/f/user/${item.userId}`}>{item.nickname}</Link>
          </li>
        );
      }) 
    );
  }

  emptyResult() {
    return (
      <li className="italic">
        Result is empty.
      </li>
    );
  }

  useWhichOne() {
    // when search result is empty and current keyword equel to searched keyword show empty result text
    let fn = (toReturn) => {
      if(this.props.searching) {
        return (<li className="italic">Searching</li>);
      } else if(this.props.searched.type === this.props.type && !this.props.result.length) {
          //     当前搜索过的类型	            用户现在选择的类型	  有结果                  
        return this.emptyResult();
      } else {
        let notice = (
          <li key="Top">
            {
              this.props.searched.keyword && 
              !this.props.searching && 
              <h3 className="curr-title">
                {`Result of ${this.props.searched.keyword}`}
              </h3>
            }
          </li>
        );

        return [notice].concat(toReturn.call(this));
      }
    }

    if (this.props.type === 1 && this.props.searched.keyword) {
      return fn(this.trackResults);
    } else if(this.props.type === 10 && this.props.searched.keyword) {
      return fn(this.albumResults);
    } else if(this.props.type === 100 && this.props.searched.keyword) {
      return fn(this.artistsResults);
    } else if(this.props.type === 1002 && this.props.searched.keyword) {
      return fn(this.userResults);
    }
  }

  searchShowMoreLoading() {
    if(this.props.showMoreLoading) {
      return (<li className="a-track flex j-center">
                <Loading width="50px"/>
              </li>);
    } else if(
        this.props.count > 30 && 
        // 搜索的结果数量大于 30 因为每页会显示30个结果
        this.props.searched.keyword && 
        // 当前关键字是搜索被搜索过的
        !this.props.searching && 
        // 不在搜索的 searching 状态中
        this.props.offset * 30 < this.props.count
        // 显示的结果小于搜索结果数量
      ) {
        return (<li onClick={()=> this.props.showMoreHandler()} className="a-track view-all-wap flex j-center">
                  <div className="view-all">
                    View more results
                  </div>
                </li>);
    }
  }

  render() {
    return (
      <ul className="result-u flex-c j-start a-start">
        {this.useWhichOne()}
        {this.searchShowMoreLoading()}
      </ul>
    );
  }
}

export default Result;