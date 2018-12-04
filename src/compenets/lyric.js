import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios";


class Lyric extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            lyric: null,
            timer: null,
            isPadding: true
        }
        if(!props.id){
            return null
        }
        this.handleLyric = this.handleLyric.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { id } = nextProps
        const { props } = this
        if(id && props.id != id){
            this.setState({
                index: 0,
                lyric: false,
                isPadding: true
            }, () => {
                this.lyricGetter(nextProps.id, () => {this.handleLyric()})
            })
        } else {
            this.state.lyric && this.handleLyric()
        }
    }

    handleLyric() {
        const { currentTime } = this.props
        const { state, state: { lyric, index, isPadding } } = this
        const isLate = currentTime >= lyric[index].t ? 1 : -1
        let tagIndex = index
        
        if(isPadding){
            if(lyric && currentTime >= lyric[0].t){
                this.setState({
                    isPadding: false
                })
            }
            return 
        }
        while(lyric[tagIndex + isLate] && (currentTime - lyric[tagIndex + isLate].t) * isLate > 0){
            tagIndex += isLate
        }
        this.setState({
            index: tagIndex
        })
    }

    async lyricGetter(id, callback) {
        const { data: {lrc: { lyric }} } = await axios.get(`http://127.0.0.1:3002/lyric?id=${id}`)
        let finalLyric = []
        lyric.split("\n").forEach(item => {
            let t = item.match(/(?<=\[)\d{2}\:\d{2}\.\d{2}(?=\])/g)
            t = t && t[0].split(":")
            t && finalLyric.push({
                t: Number((t[0] * 60 + parseFloat(t[1])).toFixed(3)),
                c: item.substring(item.indexOf("]") + 1, item.length)
            })
        })
        this.setState({
            lyric: finalLyric
        }, () => {
            callback && callback()
        });
    }

    render() {
        const { state } = this
        return(
            <div>
                {
                    state.lyric && !state.isPadding &&
                    <span>{state.lyric[state.index].c}</span>
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    const { list } = state,
        id = list.playList && list.playIndex != undefined && list.playList[list.playIndex].id || "",
        { currentTime } = state.lyric
    return {
        id,
        currentTime
    }
}

export default connect(mapStateToProps)(Lyric)