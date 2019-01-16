import React from 'react'
import { Tabs } from '../../src'

export default class Page extends React.Component {
  state = {
    value: 0,
    other: false
  }

  handleChange = value => {
    this.setState({ value })
  }

  toggleTab = () => {
    this.setState({ other: !this.state.other})
  }

  render() {
    const { value, other } = this.state

    return (
      <>
        <h2>没有value</h2>
        <Tabs type="easy" value={value}>
          {
            other
              ? <>
                <Tabs.Item value={2}>我是一个长长的菜单</Tabs.Item>
                <Tabs.Item value={0} onClick={() => this.toggleTab()}>我是一个长长的菜单</Tabs.Item>
                <Tabs.Item value={3}>我是一个长长的菜单</Tabs.Item>
              </>
              : <>
                <Tabs.Item value={0}>菜单一</Tabs.Item>
                <Tabs.Item value={3} onClick={() => this.toggleTab()}>菜单二</Tabs.Item>
                <Tabs.Item value={1}>菜单三</Tabs.Item>
              </>
          }
        </Tabs>
      </>
    )
  }
}