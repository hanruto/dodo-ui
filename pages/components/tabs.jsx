import React from 'react'
import { Tabs, Tab } from '../../src/tabs'
import withLayout from '../../site/withLayout'

@withLayout
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
          <Tab>菜单一</Tab>
          <Tab>菜单二</Tab>
          <Tab>菜单三</Tab>
          <Tab>我是一个长长的菜单</Tab>
        </Tabs>

        <h2>简约风格</h2>
        <Tabs type="easy" width={200} value={value} onChange={this.handleChange}>
          <Tab>菜单一</Tab>
          <Tab>菜单二</Tab>
          <Tab>菜单三</Tab>
          <Tab>我是一个长长的菜单</Tab>
        </Tabs>
      </>
    )
  }
}