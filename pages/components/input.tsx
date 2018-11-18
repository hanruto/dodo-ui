import React, { Component } from 'react'
import Input from '../../src/input'
import InputArea from '../../src/input/input-area'


export default class componentName extends Component {
  render() {
    return (
      <>
        <h2>普通表单</h2>
        <Input placeholder="Plain" />

        <h2>全宽度</h2>
        <Input fullWidth placeholder="Full width" />

        <h2>带label的</h2>
        <Input label="With label" />

        <h2>必填项</h2>
        <Input label="With required label" required />

        <h2>出错</h2>
        <Input label="Has error" error />

        <h2>禁用</h2>
        <Input label="Disabled" disabled />

        <h2>多行文本</h2>
        <InputArea label="Teatarea" rows={5} />
      </>
    )
  }
}
