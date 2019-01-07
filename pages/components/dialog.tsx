import React from 'react'
import Dialog from '../../src/dialog'
import Button from '../../src/button'

export default class Page extends React.Component {
  handleOpen = () => {
    const dialog = Dialog.create({
      title: '提示',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptate fugiat culpa nesciunt, quam commodi voluptatem accusantium hic? Explicabo consectetur nulla ullam aliquam. Numquam cumque voluptates ipsa reprehenderit, recusandae officiis.'
    })

    dialog.show()
      .then(() => {
        dialog.close()
      })
  }

  handleContinuouslyOpen = async () => {
    const dialog1 = Dialog.create({
      noCancelBtn: true,
      title: '提示',
      content: '是否要打开第二个对话框'
    })

    const dialog2 = Dialog.create({
      title: '对话框二号',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptate fugiat culpa nesciunt, quam commodi voluptatem accusantium hic? Explicabo consectetur nulla ullam aliquam. Numquam cumque voluptates ipsa reprehenderit, recusandae officiis.'
    })

    const isOk = await dialog1.show()
    if (isOk) {
      await dialog1.close({ notCloseMask: true })
      await dialog2.show()
      dialog2.close()
    } else {
      dialog1.close()
    }
  }

  render() {
    return (
      <>
        <h2>对话框</h2>
        <Button onClick={this.handleOpen} type="primary">打开对话框</Button>

        <h2>连续打开对话框</h2>
        <Button onClick={this.handleContinuouslyOpen} type="primary">连续对话框</Button>
      </>
    )
  }
}
