import React from 'react'
import withLayout from '../site/withLayout'


@withLayout
export default class Page extends React.Component {
  render() {
    return (
      <>
        <h2>使用方法</h2>
        <code>
          {
          `import {Button, Input, Dialog} from 'dodoui`
          }
        </code>
      </>
    )
  }
}
