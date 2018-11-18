import React from 'react'
import withLayout from '../site/withLayout'
import Highlight from 'react-highlight'

const code = `import React from 'react'
import { Button } from 'dodoui'

const DoDoButton = () => {
  return <Button>DEFAULT</Button>
}
`

@withLayout
export default class Page extends React.Component {
  render() {
    return (
      <>
        <h2>使用方法</h2>
        <Highlight >{code}</Highlight>

        <h2>说明</h2>
        <p>这个组件库的开发主要是为了记录在开发个人博客dodoblog.cn的过程中所用到的一些组件，以及可以在未来的项目开发中复用这些组件，目前博客依然只是在开发初期，随着功能的不断扩大会产生越来越多的优质组件。</p>
        <p>开发这个组件库的初衷并不是像antd之类的react组件库一样面向广大的react开发人员和市面上的普遍需求</p>
        <p>而是旨在为了记录开发中灵感爆棚的时候，想到的一些有趣的组件，如果你也有好玩的组件，不针对任何需求，只要有趣，有心就好，可以联系我，让我们一起壮大这个有趣的组件库</p>
      </>
    )
  }
}
