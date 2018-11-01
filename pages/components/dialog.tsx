import React from 'react'
import withLayout from '../../site/withLayout'
import Dialog from '../../src/dialog'
import Button from '../../src/button'

@withLayout
export default class Page extends React.Component {
  state = {
    open: false
  }
  handleOpen = () => {
    Dialog.open({
      title: '提示',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptate fugiat culpa nesciunt, quam commodi voluptatem accusantium hic? Explicabo consectetur nulla ullam aliquam. Numquam cumque voluptates ipsa reprehenderit, recusandae officiis.'
    })
  }

  handleOpenContinue = () => {
    Dialog.open({
      title: '提示',
      content: 'dialog 1',
      onOk: (_, close) => {
        close()
        Dialog.open({
          title: '提示',
          content: 'dialog 2',
          onOk: (_, close) => {
            close()
          }
        })
      }
    })
  }

  handleOpenQuick = () => {
    Dialog.open({
      title: '提示',
      content: 'dialog 1',
      animationDuration: 200,
      onOk: (_, close) => {
        close()
      }
    })
  }

  handleOpenSlow = () => {
    Dialog.open({
      title: '慢慢打开',
      content: 'dialog 1',
      animationDuration: 2000,
      onOk: (_, close) => {
        close()
      }
    })
  }

  render() {
    return (
      <>
        <h2>对话框</h2>
        <Button onClick={this.handleOpen} type="primary">打开对话框</Button>

        <h2>连续打开对话框</h2>
        <Button onClick={this.handleOpenContinue} type="primary">连续打开对话框</Button>

        <h2>设置打开速度</h2>
        <Button onClick={this.handleOpenQuick} type="warning">快速打开</Button>
        <Button onClick={this.handleOpenSlow} type="danger">缓慢打开</Button>
      </>
    )
  }
}
