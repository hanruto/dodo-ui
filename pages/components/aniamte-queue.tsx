import React from 'react'
import { Animate, AnimateQueue, AnimateQueueGroup } from '../../src/animate-queue'
import Button from '../../src/button'
import withLayout from '../../site/withLayout'

@withLayout
export default class Page extends React.Component {
  state = {
    animate1: true,
    animate2: true,
    animate3: true
  }

  componentDidMount() {
    this.setState({ animate: true })
  }

  handleToggle = index => {
    this.setState({ ['animate' + index]: !this.state['animate' + index] })
  }

  render() {
    const { animate1, animate2, animate3 } = this.state

    return (
      <>
        <h2>动画</h2>
        <Animate animate={animate1}>
          <p>我是一段会动的文字</p>
        </Animate>
        <Button style={{ marginTop: 20 }} onClick={() => this.handleToggle(1)}>切换动画</Button>

        <h2>动画队列</h2>
        <AnimateQueue animate={animate2}>
          <p>我是一段会动的文字</p>
          <p>我是一段会动的文字</p>
          <p>我是一段会动的文字</p>
          <p>我是一段会动的文字</p>
        </AnimateQueue>

        <h2>动画队列的间隔和速度</h2>
        <AnimateQueue speed={2000} interval={200} animate={animate2}>
          <p>我是一段会动的文字</p>
          <p>我是一段会动的文字</p>
          <p>我是一段会动的文字</p>
          <p>我是一段会动的文字</p>
        </AnimateQueue>

        <h2>动画的样式</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <AnimateQueue
              animate={animate2}
              from={{ transform: 'translateX(-30px)' }}
              to={{ transform: 'translateX(0px)' }}
            >
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
          </div>

          <div>
            <AnimateQueue
              animate={animate2}
              from={{ transform: 'translateX(0px)' }}
              to={{ transform: 'translateX(0px)' }}
            >
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
          </div>

          <div>
            <AnimateQueue
              animate={animate2}
              from={{ transform: 'scale(1.4) translateY(-100px)' }}
              to={{ transform: 'scale(1) translateY(0px)' }}
            >
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
          </div>

          <div>
            <AnimateQueue
              animate={animate2}
              from={{ transform: 'scale(0)', }}
              to={{ transform: 'scale(1)', }}
            >
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
          </div>
        </div>

        <Button style={{ marginTop: 20 }} onClick={() => this.handleToggle(2)}>切换动画</Button>

        <h2>动画队列分组依次执行</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AnimateQueueGroup animate={animate3}>
            <AnimateQueue>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
            <AnimateQueue>
              <h2>我是标题</h2>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
            <AnimateQueue>
              <h2>我是标题</h2>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
            <AnimateQueue>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
              <p>我是一段会动的文字</p>
            </AnimateQueue>
          </AnimateQueueGroup>
        </div>
        <Button style={{ marginTop: 20 }} onClick={() => this.handleToggle(3)}>切换动画</Button>
      </>
    )
  }
}