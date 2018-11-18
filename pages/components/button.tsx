import React from 'react'
import { Button } from '../../src'


export default class Demo extends React.Component {
  render() {
    return (
      <>
        <h2>默认按钮类型</h2>
        <div>
          <Button>DEFAULT</Button>
          <Button type="primary">PRIMARY</Button>
          <Button type="warning">WARNING</Button>
          <Button type="danger">DANGER</Button>
          <Button type="success">SUCCESS</Button>
        </div>

        <h2>按钮有阴影</h2>
        <div>
          <Button shadow={true}>DEFAULT</Button>
          <Button shadow={true} type="primary">PRIMARY</Button>
          <Button shadow={true} type="warning">WARNING</Button>
          <Button shadow={true} type="danger">DANGER</Button>
          <Button shadow={true} type="success">SUCCESS</Button>
        </div>

        <h2>按钮全宽度</h2>
        <div>
          <Button fullWidth={true}>DEFAULT</Button>
          <Button fullWidth={true} type="primary">PRIMARY</Button>
          <Button fullWidth={true} type="warning">WARNING</Button>
          <Button fullWidth={true} type="danger">DANGER</Button>
          <Button fullWidth={true} type="success">SUCCESS</Button>
        </div>

        <h2>按钮被禁用</h2>
        <div>
          <Button disabled={true}>DEFAULT</Button>
          <Button disabled={true} type="primary">PRIMARY</Button>
          <Button disabled={true} type="warning">WARNING</Button>
          <Button disabled={true} type="danger">DANGER</Button>
          <Button disabled={true} type="success">SUCCESS</Button>
        </div>

        <h2>点击保护</h2>
        <div >
          <Button clickProtectDuration={1000}>DEFAULT</Button>
        </div>
      </>
    )
  }
}
