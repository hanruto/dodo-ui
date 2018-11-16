import React from 'react'
import { Icon } from '../../src'
import withLayout from '../../site/withLayout'

@withLayout
export default class Page extends React.Component {
  render() {
    return (
      <>
        <h2>普通选项卡</h2>
        <Icon type="play" />

        <Icon type="pause" />

        <Icon type="bars" />

        <Icon type="close" />
      </>
    )
  }
}