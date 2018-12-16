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

  render() {
    return (
      <>
        <h2>对话框</h2>
        <Button onClick={this.handleOpen} type="primary">打开对话框</Button>
      </>
    )
  }
}
