import React from 'react'
import { Drawer } from '../../src'


export default class Page extends React.Component {
  render() {
    return (
      <>
        <h2>这个不是空白页面，按钮在右侧</h2>
        <Drawer>
          lalala
        </Drawer>
      </>
    )
  }
}