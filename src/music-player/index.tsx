import * as React from 'react'
import classnames from 'classnames'

function formatTimeNumber(number) {
  return (number + 100).toString().substr(1, 2)
}

function formatLyric(lyric) {
  const lyricRows = lyric.split('\n')
  const lyrics = []
  lyricRows.forEach(row => {
    const matched = row.match(/\[(.*)\](.*)/) || {}
    let time = matched[1]
    const lyric = matched[2]
    if (time && !lyric) {
      lyrics.push({ time: 0, lyric: time })
    }
    if (time && lyric) {
      const [m, s] = time.split(':')
      time = Number(m) * 60 + Number(s)
      lyrics.push({ time, lyric })
    }
  })

  return lyrics
}

function secondToMunite(time) {
  if (!time) return '--:--'
  const seconds = parseInt(time)
  return formatTimeNumber(parseInt((seconds / 60).toString())) + ':' + formatTimeNumber(seconds % 60)
}

interface Props {
  getAudio?: Function
  musics?: {
    pic: string,
    name: string,
    singer: string,
    url: string,
    id: string,
    lrc: string
  }[]
  onPlay?: Function
  audioConfig?: {
    position: string
    size: string
  }
}
export default class MusicPlayer extends React.Component<Props> {
  $audio: any = React.createRef()
  $list: any = React.createRef()
  $listInner: any = React.createRef()

  currentIndex = 0
  lyricStr = ''
  timer = null

  state = {
    currentIndex: 0,
    paused: true,
    currentTime: null,
    duration: null,

    open: false,
    showList: false,
    hiddenInBottom: false,
  }

  componentDidMount() {
    const musics = this.props.musics
    const audio = this.$audio.current

    const currentIndex = musics && musics.findIndex(item => item.id === window.localStorage.getItem('current-music-id'))
    this.setState({
      open: window.localStorage.getItem('open-music-player') === '1',
      currentIndex: currentIndex !== -1 ? currentIndex : 0,
    })
    if (audio) {
      audio.addEventListener('play', this.handlePlay)
      audio.addEventListener('pause', this.handlePause)
      this.props.getAudio && this.props.getAudio(audio)
    }
  }

  componentDidUpdate(nextProps) {
    // 切换歌单
    if (nextProps.musics !== this.props.musics) {
      this.setState({ currentIndex: 0 }, this.handlePlay)
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  handleLoadLrc = () => {
    const request = new XMLHttpRequest();
    const url = this.props.musics[this.state.currentIndex].lrc
    request.open('GET', url, true);
    request.onload = () => {
      this.lyricStr = request.response
    }
    request.send();
  }

  handlePlay = () => {
    const music = this.props.musics[this.state.currentIndex]
    const audio = this.$audio.current

    this.handleLoadLrc()
    this.props.onPlay && this.props.onPlay(music)
    this.setState({ paused: false })

    window.localStorage.setItem('current-music-id', music.id)
    audio.play(audio.currentTime)

    this.timer = setInterval(() => {
      const { currentTime, duration } = audio
      this.setState({ currentTime, duration })
    }, 100)
  }

  handlePause = () => {
    this.setState({ paused: true })
    this.$audio.current && this.$audio.current.pause()
    this.timer && clearInterval(this.timer)
  }

  handlePlayFrom = e => {
    const audio = this.$audio.current
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickPos = (e.clientX - left) / width
    const time = audio.duration * clickPos
    if (!time) return false
    audio.currentTime = time
  }

  handleNext = () => {
    let currentIndex = this.state.currentIndex + 1
    if (currentIndex >= this.props.musics.length) {
      currentIndex = 0
    }

    this.setState({ currentIndex }, this.handlePlay)
  }

  handlePrev = () => {
    let currentIndex = this.state.currentIndex - 1
    if (currentIndex < 0) {
      currentIndex = this.props.musics.length - 1
    }

    this.setState({ currentIndex }, this.handlePlay)
  }

  handleToggle = currentIndex => {
    this.setState({ currentIndex }, this.handlePlay)
  }

  // ui 样式功能， 开关列表和播放器 open hiddenInBottom showList
  handleToggleOpen = () => {
    const open = !this.state.open
    this.setState({ open })
    localStorage.setItem('open-music-player', open ? '1' : '0')
  }

  handleToggleList = () => {
    const showList = !this.state.showList

    const list = this.$list.current
    const listInnerWrapper = this.$listInner.current
    list.style.height = showList ? listInnerWrapper.offsetHeight + 'px' : 0 + 'px'
    this.setState({ showList })
  }

  handleTogglePanel = () => {
    const hiddenInBottom = !this.state.hiddenInBottom
    this.setState({ hiddenInBottom })
  }

  get lyric() {
    if (!this.lyricStr) return false

    const lyricsInfo = formatLyric(this.lyricStr)
    const audio = this.$audio.current || {}
    let currentLyric = ''

    lyricsInfo && lyricsInfo.forEach((item, index) => {
      const isLast = lyricsInfo.length === index + 1
      const musicTime = audio.currentTime

      if (isLast && musicTime > item.time - 0.02) {
        currentLyric = item.lyric
      } else {
        if (musicTime > item.time - 0.02 && musicTime < lyricsInfo[index + 1].time - 0.02) {
          currentLyric = item.lyric
        }
      }
    })

    return currentLyric
  }

  render() {
    const { open, duration, currentTime, hiddenInBottom, showList, paused, currentIndex } = this.state
    const { audioConfig = { position: 'bottom', size: 'large' }, musics } = this.props

    if (!musics || !musics.length) return false

    const { pic, name, singer, url } = musics[currentIndex]
    const audio = this.$audio.current || {}

    return (
      <div className={classnames(
        "main-music-player",
        open ? 'open' : 'close',
        hiddenInBottom ? 'hidden' : 'show',
        showList && 'main-music-player-show-list',
        audioConfig.position === 'bottom' && 'main-music-player-in-bottom',
        audioConfig.size === 'large' && 'main-music-player-large',
        paused ? 'pause' : 'play'
      )}>
        <audio src={url} ref={this.$audio} onEnded={this.handleNext} />
        <div className="main-music-player-wrapper">
          <div className="main-music-player-pic" onClick={paused ? this.handlePlay : this.handlePause}>
            <img src={pic} />
            <div className={classnames("music-player-play-btn", paused ? 'pause' : 'play')}>
              <svg width={30} height={30}>
                <path className="svg-play-btn" stroke="#fff" strokeWidth={3} strokeLinecap="butt" fill="none"></path>
              </svg>
            </div>
          </div>

          <div className="main-music-player-info">
            <div style={{ width: '100%' }}>
              <div className="main-music-player-name text-overflow-ellipsis" style={{ width: 'calc(100% - 80px)' }}>{name}</div>
              <div className="main-music-player-author">{singer}</div>
            </div>
            <div className="main-music-player-control">
              <svg width={25} height={30} onClick={this.handlePrev}>
                <path className="svg-play-btn"
                  stroke="#999"
                  strokeWidth={3}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 3 5 15 18 27"
                ></path>
              </svg>

              <svg width={25} height={30} onClick={this.handleNext}>
                <path className="svg-paly-btn"
                  stroke="#999"
                  strokeWidth={3}
                  strokeLinecap="round"
                  fill="none"
                  d="M3 3 18 15 3 27"
                ></path>
              </svg>
            </div>
            {
              currentTime
                ? <div className="main-music-player-progress-bar" onClick={this.handlePlayFrom}>
                  <div
                    className="main-music-player-progress-bar-inner"
                    style={{ width: `${currentTime / duration * 100}%` }}
                  ></div>
                  <span className="main-music-player-progress-bar-timer">{secondToMunite(audio.currentTime)} / {secondToMunite(audio.duration)}</span>
                  {
                    this.lyric
                      ? <span
                        className="main-music-player-progress-bar-lyric text-overflow-ellipsis"
                        style={{ width: 'calc(100% - 80px)' }}
                      >{this.lyric}</span>
                      : null
                  }
                </div>
                : null
            }
          </div>

          <div className={classnames("main-music-player-toggle", open ? 'open' : 'close')} onClick={this.handleToggleOpen}>
            <svg width={10} height={30}>
              <path className="svg-btn" stroke="#fff" strokeWidth={2} strokeLinecap="butt" fill="none"></path>
            </svg>
          </div>
        </div>
        <div className="main-music-player-sider">
          <div className="main-music-player-sider-ball" onClick={this.handleToggleList}>列表</div>
          <div className="main-music-player-sider-ball" onClick={this.handleTogglePanel}>收起</div>
        </div>
        <div className="main-music-player-list" ref={this.$list}>
          <div className="main-music-player-list-inner" ref={this.$listInner}>
            <h3>播放列表 <span className="sub">共{musics.length}首</span></h3>
            <div className="main-music-player-list-wrapper">
              {
                musics.map((music, index) => (
                  <div key={music.id} className="main-music-player-list-item" onClick={() => this.handleToggle(index)}>
                    <span className="main-music-player-list-item-name">{music.name}</span>
                    <span className="main-music-player-list-item-singer">{music.singer}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div >
    )
  }
}
