import React from 'react'


/**
 * props
 *  autodetect 自动检测，根据滚动位置判断
 *  interval 动画队列间隔时间
 *  animate  不开启自动检测的时候，可以通过animate手动控制动画
 *  hidden Condition: showHeight  默认值是当
 */
interface Props {
  interval?: number,
  animate?: boolean
}

export class AnimateQueue extends React.Component<Props> {
  interval = this.props.interval || 250
  
  state: any = {
    aniamte: false,
    current: 0
  }

  componentDidMount() {
    const { animate } = this.props
    this.setState({ animate })
  }

  render() {
    const { children } = this.props
    const { animate } = this.state

    const style = {
      transform: `translateX(0px) translateY(${animate ? 0 : 40}px)`,
      transition: 'all ease 0.3s',
      opacity: animate ? 1 : 0
    }

    return React.Children.map(children, (item: any) => {
      return React.cloneElement(item, { style })
    })
  }
}

export class Animate extends React.Component<Props> {
  interval = this.props.interval || 250
  state: any = {
    aniamte: false
  }
  componentDidMount() {
    const { animate } = this.props
    this.setState({ animate })
  }

  render() {
    const { children } = this.props
    const { animate } = this.state

    const style = {
      transform: `translateX(0px) translateY(${animate ? 0 : 40}px)`,
      transition: 'all ease 0.3s',
      opacity: animate ? 1 : 0
    }

    if(!children) return null

    return React.Children.map(children, (item: any) => {
      return React.cloneElement(item, { style })
    })
  }
}