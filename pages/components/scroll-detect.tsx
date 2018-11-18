import React from 'react'
import ScrollDetect from '../../src/scroll-detect'
import { AnimateQueue } from '../../src/animate-queue'


class AutoAnimate extends React.Component {
  state = {
    animate: false
  }

  handleAnimate = () => {
    this.setState({ animate: true })
    console.log(123)
  }

  handleUnAnimate = () => {
    this.setState({ animate: false })
  }

  render() {
    const { animate } = this.state

    return (
      <>
        <h2>滚动侦查者</h2>
        <div style={{ marginTop: 200, borderTop: '1px solid #ccc' }}></div>
        <ScrollDetect onScrollInto={this.handleAnimate} onScrollOut={this.handleUnAnimate}>
          <AnimateQueue animate={animate}>
            <p>我是一段会动的文字</p>
            <p>我是一段会动的文字</p>
            <p>我是一段会动的文字</p>
            <p>我是一段会动的文字</p>
          </AnimateQueue>
        </ScrollDetect>
      </>
    )
  }
}
export default class Page extends React.Component {
  render() {
    return (
      <div>
        <AutoAnimate />
        <AutoAnimate />
        <AutoAnimate />
        <AutoAnimate />
        <AutoAnimate />
        <AutoAnimate />
        <AutoAnimate />
      </div>
    )
  }
}
