import React from 'react'
import { Tabs } from '../../src'

export default class Page extends React.Component {
  state = {
    value: 0
  }

  handleChange = value => {
    this.setState({ value })
  }
  render() {
    const { value } = this.state

    return (
      <>
        <h2>普通选项卡</h2>
        <Tabs value={value} onChange={this.handleChange}>
          <Tabs.Item>菜单一</Tabs.Item>
          <Tabs.Item>菜单二</Tabs.Item>
          <Tabs.Item>菜单三</Tabs.Item>
          <Tabs.Item>我是一个长长的菜单</Tabs.Item>
        </Tabs>

        <h2>简约风格</h2>
        <Tabs type="easy" width={200} value={value} onChange={this.handleChange}>
          <Tabs.Item>菜单一</Tabs.Item>
          <Tabs.Item>菜单二</Tabs.Item>
          <Tabs.Item>菜单三</Tabs.Item>
          <Tabs.Item>我是一个长长的菜单</Tabs.Item>
        </Tabs>
      </>
    )
  }
}