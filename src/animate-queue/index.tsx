import React from 'react'


/**
 * props
 *  autodetect 自动检测，根据滚动位置判断
 *  interval 动画队列间隔时间
 *  animate  不开启自动检测的时候，可以通过animate手动控制动画
 *  hidden Condition: showHeight  默认值是当
 */
interface Props {
  interval?: number
}

export default class AnimateQueue extends React.Component<Props> {
  interval = this.props.interval || 250
  state = {
    aniamte: false
  }
  componentDidMount() {

  }

  render() {
    const { children } = this.props

    return React.Children.map(children, (item: any) => {
      React.cloneElement(item, {
        style: {}
      })
    })
  }
}
