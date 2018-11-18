import React from 'react'
import { Drawer } from '../../src'
import withLayout from '../../site/withLayout'


@withLayout
export default class Page extends React.Component {
  render() {
    return (
      <>
        <Drawer>
          lalala
        </Drawer>
      </>
    )
  }
}