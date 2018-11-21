import React from 'react'
import { MusicMetronome } from '../../src'


export default class Page extends React.Component {
  $audio: any = React.createRef()
  state = {
    showMetronome: false
  }
  componentDidMount() {
    this.setState({ showMetronome: true })
  }
  render() {
    const { showMetronome } = this.state

    return (
      <>
        <h2>音乐节拍器</h2>
        <audio src="https://api.bzqll.com/music/netease/url?id=1316375786&key=579621905" autoPlay={true} ref={this.$audio} />

        {showMetronome && <MusicMetronome audio={this.$audio.current} />}
      </>
    )
  }
}