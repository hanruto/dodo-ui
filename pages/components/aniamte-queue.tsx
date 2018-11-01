import React from 'react'
import { Animate, AnimateQueue } from '../../src/animate-queue'
import Button from '../../src/button'
import withLayout from '../../site/withLayout'

@withLayout
export default class Page extends React.Component {
  render() {

    return (
      <>
        <h2>动画</h2>
        <Animate animate={true}>
          <Button>我是一个会动的按钮</Button>
        </Animate>

        <h2>动画队列</h2>
        <AnimateQueue animate={true}>
          <Animate animate={true}>
            <Button>我是一个会动的按钮</Button>
          </Animate>

          <Animate animate={true}>
            <Button>我也是一个会动的按钮</Button>
          </Animate>

          <Animate animate={true}>
            
          </Animate>
        </AnimateQueue>
      </>
    )
  }
}