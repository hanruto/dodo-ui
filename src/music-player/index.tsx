import * as React from 'react'
import classnames from 'classnames'
import { secondToMunite } from '../utils/tool'
import Icon from '../icon'
import _ from 'lodash'


const noop = () => { }

const MusicList = props => {
  const { musics, onToggle, current } = props
  return (
    <div className="main-music-player-list">
      <h3>播放列表 <span className="sub">共{musics.length}首</span></h3>
      <div className="main-music-player-list-wrapper">
        {
          musics.map((music, index) => (
            <div
              key={music.id}
              className={classnames("main-music-player-list-item", current === index && 'active')}
              onClick={() => onToggle(index)}
            >
              <span className="main-music-player-list-item-name">{music.name}</span>
              <span className="main-music-player-list-item-singer">{music.singer}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}


interface Props {
  paused?: boolean
  getAudio?: Function
  musics?: {
    pic: string,
    name: string,
    singer: string,
    url: string,
    id: string,
    lrc: string
  }[]
  audioConfig?: {
    position: string
  }
  listId?: string
  musicId?: string
  onChange?: Function
  onPlay?: Function
  onPause?: Function
}

export default class MusicPlayer extends React.Component<Props> {
  $audio: any = React.createRef()
  currentIndex = 0

  get randomList() {
    return _.shuffle(this.props.musics)
  }

  state = {
    currentIndex: 0,
    loop: false,
    currentTime: null,
    duration: null,
    random: false,
    open: false,
    showList: false,
  }

  timer = null
  playTimer = null
  playPromise = null
  historyRoute = '/music/list'

  componentDidMount() {
    const audio: any = this.$audio.current

    this.setState({ open: window.localStorage.getItem('open-music-player') === '1' })

    audio.addEventListener('ended', this.handleNext)
    audio.addEventListener('play', this.handlePlay)
    audio.addEventListener('pause', this.handlePause)
    audio.addEventListener('canplay', () => {
      const { currentTime, duration } = audio
      this.setState({ currentTime, duration })
    })

    audio.addEventListener('error', () => setTimeout(this.handleNext, 500))

    this.props.getAudio && this.props.getAudio(audio)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paused !== this.props.paused) {
      const { paused } = this.props
      paused ? this.handlePause() : this.handlePlay()
    }

    if (prevProps.listId !== this.props.listId) {
      this.setState({ currentIndex: 0 })
      !this.props.paused && this.handleToggle(0)
    }

    if (prevProps.musicId !== this.props.musicId) {
      const musics = this.props.musics
      const currentIndex = musics.findIndex(item => item.id === this.props.musicId)
      if (currentIndex !== -1) {
        this.setState({ currentIndex })
        !this.props.paused && this.handleToggle(currentIndex)
      }
    }
  }

  componentWillUnmount() {
    this.handleClear()
  }

  handlePlay = async () => {
    const audio = this.$audio.current
    if (this.playPromise) await this.playPromise
    this.playPromise = await audio.play(audio.currentTime)
      .catch(err => {
        console.log(err)
        clearTimeout(this.playTimer)
        this.playTimer = setTimeout(() => this.handlePlay(), 1000)
      })
      .then(() => {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          const { currentTime, duration } = audio
          this.setState({ currentTime, duration })
        }, 200)
      })
  }

  handlePause = () => {
    this.$audio.current && this.$audio.current.pause()
    this.handleClear()
  }

  handleClear = () => {
    this.timer && clearInterval(this.timer)
    this.playTimer && clearTimeout(this.playTimer)
  }

  handlePlayFrom = e => {
    const audio = this.$audio.current
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickPos = (e.clientX - left) / width
    const currentTime = audio.duration * clickPos
    audio.currentTime = currentTime
    this.setState({ currentTime })
  }

  handleNext = () => {
    const { random, currentIndex } = this.state
    const { musics } = this.props
    let nextIndex = 0
    if (random) {
      const currentId = musics[currentIndex].id
      const randomIndex = this.randomList.findIndex(item => item.id === currentId)
      const nextId = this.randomList[randomIndex + 1 > this.randomList.length ? 0 : randomIndex + 1].id
      nextIndex = musics.findIndex(item => item.id === nextId)
    } else {
      nextIndex = this.state.currentIndex + 1
      if (nextIndex >= musics.length) nextIndex = 0
    }

    this.setState({ currentIndex: nextIndex }, () => this.handleChangeIndex(nextIndex))
  }

  handlePrev = () => {
    const { random, currentIndex } = this.state
    const { musics } = this.props
    let nextIndex = currentIndex
    if (random) {
      const currentId = musics[currentIndex].id
      const randomIndex = this.randomList.findIndex(item => item.id === currentId)
      const nextId = this.randomList[randomIndex - 1 < 0 ? this.randomList.length - 1 : randomIndex - 1].id
      nextIndex = musics.findIndex(item => item.id === nextId)
    } else {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) nextIndex = musics.length - 1
    }

    this.setState({ currentIndex: nextIndex }, () => this.handleChangeIndex(nextIndex))
  }

  handleToggle = currentIndex => {
    this.setState({ currentIndex }, () => this.handleChangeIndex(currentIndex))
  }

  handleChangeIndex = nextIndex => {
    const { paused, musics } = this.props
    if (!paused) this.handlePlay()
    this.props.onChange && this.props.onChange(musics[nextIndex], nextIndex)
  }

  handleToggleOpen = () => {
    const open = !this.state.open
    this.setState({ open })
    localStorage.setItem('open-music-player', open ? '1' : '0')
  }

  handleToggleList = () => {
    this.setState({ showList: !this.state.showList })
  }

  handleToggleLoop = () => {
    const loop = !this.state.loop
    const audio = this.$audio.current
    loop ? audio.removeEventListener('ended', this.handleNext) : audio.addEventListener('ended', this.handleNext)
    this.setState({ loop })
  }

  handleRandom = () => {
    this.setState({ random: !this.state.random })
  }

  render() {
    const { open, duration, currentTime, loop, showList, currentIndex, random } = this.state
    const {
      audioConfig = { position: 'bottom' },
      musics = [],
      paused,
      onPlay = noop,
      onPause = noop
    } = this.props
    const { pic, name, singer, url } = musics[currentIndex]

    return (
      <div className={classnames(
        "main-music-player",
        open ? 'open' : 'close',
        showList && 'main-music-player-show-list',
        audioConfig.position === 'bottom' ? 'main-music-player-in-bottom' : 'main-music-player-small',
        paused ? 'pause' : 'play',
      )}>
        <audio src={url} ref={this.$audio} loop={loop} />
        <div className="main-music-player-wrapper">
          <div
            className="main-music-player-pic"
            onClick={paused ? () => onPlay() : () => onPause()}
          >
            <img src={pic} alt={name} />
            <div className={classnames("music-player-play-btn")}>
              <Icon type={paused ? 'pause' : 'play'} />
            </div>
          </div>
          <div className="main-music-player-info">
            <div className="main-music-player-progress-bar" onClick={this.handlePlayFrom}>
              <div
                className="main-music-player-progress-bar-inner"
                style={{ width: `${currentTime / duration * 100}%` }}
              ></div>
              <span className="main-music-player-progress-bar-timer">
                {duration ? `${secondToMunite(currentTime)} / ${secondToMunite(duration)}` : '加载中...'}
              </span>
            </div>
            <div className="main-music-player-desc">
              <div className="main-music-player-name text-overflow-ellipsis">{name}</div>
              <div className="main-music-player-author">{singer}</div>
            </div>

            <div className="main-music-player-control">
              <Icon type={'random'} antd={true} active={random} onClick={this.handleRandom} />
              <Icon type={'loop'} antd={true} active={loop} onClick={this.handleToggleLoop} />
              <Icon type={'menu'} active={showList} onClick={this.handleToggleList} />
              <Icon type={'left-arrow'} onClick={this.handlePrev} />
              <Icon type={'right-arrow'} onClick={this.handleNext} />
            </div>
          </div>

          <div className={classnames("main-music-player-toggle", open ? 'open' : 'close')} onClick={this.handleToggleOpen}>
            <Icon type={open ? 'left-arrow' : 'right-arrow'} />
          </div>
        </div>
        <MusicList onToggle={this.handleToggle} musics={musics} current={currentIndex} />
      </div >
    )
  }
}
