import React from 'react'
import { MusicPlayer } from '../../src'

const musics = [
  {
    id: "33861246",
    name: "1v1",
    singer: "Midnight",
    lrc: "https://api.bzqll.com/music/netease/lrc?id=33861246&key=579621905",
    pic: "https://api.bzqll.com/music/netease/pic?id=33861246&key=579621905",
    url: "https://api.bzqll.com/music/netease/url?id=33861246&key=579621905"
  },
  {
    id: "1316375786",
    name: "Take Me Away",
    singer: "DEAMN",
    lrc: "https://api.bzqll.com/music/netease/lrc?id=1318133532&key=579621905",
    pic: "https://api.bzqll.com/music/netease/pic?id=1316375786&key=579621905",
    url: "https://api.bzqll.com/music/netease/url?id=1316375786&key=579621905"
  },
  {
    id: "1318133532",
    name: "Run Away",
    singer: "Tove Styrke",
    lrc: "https://api.bzqll.com/music/netease/lrc?id=33861246&key=579621905",
    pic: "https://api.bzqll.com/music/netease/pic?id=1318133532&key=579621905",
    url: "https://api.bzqll.com/music/netease/url?id=1318133532&key=579621905"
  }
]

export default class Page extends React.Component {
  render() {
    return (
      <>
        <MusicPlayer musics={musics}/>
      </>
    )
  }
}