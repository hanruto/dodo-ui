import React from 'react'
import AnimateQueue from '../../src/animate-queue'
import withLayout from '../../site/withLayout'

@withLayout
export default class Page extends React.Component {
  render() {

    return (
      <>
        <h2>动画队列</h2>
        <AnimateQueue>
          <div>lalal</div>
        </AnimateQueue>
      </>
    )
  }
}