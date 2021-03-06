import * as React from 'react'


/**
 * props
 *  autodetect 自动检测，根据滚动位置判断
 *  interval 动画队列间隔时间
 *  animate  不开启自动检测的时候，可以通过animate手动控制动画
 *  speed 动画的速度
 */
interface Props {
  speed?: number,
  animate?: boolean,
  from?: object
  to?: object
}

const defaultSpeed = 600
const defaultInterval = 200
class Animate extends React.Component<Props> {
  render() {
    const { children, animate = true, speed = defaultSpeed, from, to } = this.props
    const additionAnimate = (animate ? to : from) || {}

    return React.Children.map(children,
      (item: any) => React.cloneElement(item, {
        style: {
          ...{
            transform: `translateY(${animate ? 0 : 40}px)`,
            transition: `all ease ${speed / 1000}s`,
            opacity: animate ? 1 : 0
          },
          ...additionAnimate
        }
      })
    )
  }
}



class AnimateQueueGroup extends React.Component<Props & QueueProps> {
  state = {
    current: 0
  }

  animate = this.props.animate

  componentDidMount() {
    this.handleNextAnimate()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate !== this.props.animate) {
      this.animate = nextProps.animate
      this.handleNextAnimate()
    }
  }

  handleNextAnimate = () => {
    let { current } = this.state
    const { children } = this.props
    const max = children ? children.length : 0

    if (this.animate && current >= max) {
      current = max
    } else if (!this.animate && current <= 0) {
      current = 0
    } else {
      this.animate ? (current = current + 1) : (current = current - 1)
    }
    this.setState({ current })
  }

  render() {
    const { children, speed = 400, animate, ...rest } = this.props
    const { current } = this.state

    return React.Children.map(children, (item: any, index: number) => {
      return (
        <div className="ze-animate-group-wrapper">
          {React.cloneElement(item, {
            animate: index < current,
            ...rest,
            onAnimateEnd: this.handleNextAnimate
          })}
        </div>
      )
    })
  }
}

interface QueueProps {
  interval?: number
  children?: any
  onAnimateEnd?: Function
  beforeAnimate?: Function
}

export class AnimateQueue extends React.Component<QueueProps & Props> {
  timer = null

  state = {
    current: 0
  }

  static Item = Animate
  static Group = AnimateQueueGroup

  componentDidMount() {
    setTimeout(() => this.handleAnimate(this.props.animate))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.animate !== this.props.animate) {
      this.handleAnimate(this.props.animate)
    }
    if (prevProps.children.length !== this.props.children.length) {
      this.handleAnimate(this.props.animate)
    }
  }

  handleAnimate = (animate) => {
    const { interval = defaultInterval, children } = this.props
    const max = children ? children.length : 0
    clearTimeout(this.timer)

    const loop = () => {
      let current = this.state.current

      if (!animate && current <= 0) {
        this.setState({ current: 0 })
        this.props.onAnimateEnd && this.props.onAnimateEnd()
        return false
      } else if (animate && current >= max) {
        this.setState({ current: max })
        this.props.onAnimateEnd && this.props.onAnimateEnd()
        return false
      } else {
        current = current + (animate ? 1 : -1)
      }

      this.setState({ current })
      this.timer = setTimeout(loop, interval)
    }

    loop()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { children, speed = 400, animate, ...rest } = this.props
    const { current } = this.state
    return React.Children.map(children, (item, index) => {
      return <Animate animate={index < current} speed={speed} {...rest}>{item}</Animate>
    })
  }
}
