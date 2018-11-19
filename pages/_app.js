import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import '../site/style.scss'
import '../styles/index.scss'
import classnames from 'classnames'

const baseViewURL = 'https://github.com/soWhiteSoColl/dodoui/blob/master/pages'
const menus = [
  { name: '介绍', href: '/use' },
  { name: '博客', href: 'https://www.dodoblog.cn', target: '_blank' },
  // { name: '设计', href: '/design' }
]
const componentMenus = [
  { name: 'Button', href: '/components/button' },
  { name: 'Input', href: '/components/input' },
  { name: 'Dialog', href: '/components/dialog' },
  { name: 'Table', href: '/components/table' },
  { name: 'Tabs', href: '/components/tabs' },
  // { name: 'Icon', href: '/components/icon' },
  { name: 'AnimateQueue', href: '/components/aniamte-queue' },
  { name: 'ScrollDetect', href: '/components/scroll-detect' },
  { name: 'MusicPlayer', href: '/components/music-player' },
  { name: 'Drawer', href: '/components/drawer' },
]

@withRouter
class Nav extends React.Component {
  render() {
    const { route } = this.props

    return (
      <div className="main-nav">
        {
          menus.map((item, index) => (
            <div className="main-nav-item" key={index}>
              <div className="main-nav-toggle">
                <Link href={item.href}><a className={classnames(route === item.href && 'active')} target={item.target}>{item.name}</a></Link>
              </div>
            </div>
          ))
        }
        <div className="main-nav-item">
          <div className="main-nav-toggle">组件</div>
          <ul>
            {
              componentMenus.map((item, index) => (
                <li className="main-nav-sub-item" key={index}>
                  <Link href={item.href}><a className={classnames(route === item.href && 'active')}>{item.name}</a></Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}


export default class Layout extends React.Component {
  static async getInitialProps({ Component, router, ctx }) {
    let initialProps = {}
    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx, store)
    }
    return { initialProps, router }
  }

  render() {
    const { Component, router } = this.props

    return (
      <div className="main-layout">
        <Nav route={router.route} />
        <div className="main-content">
          <div className="main-content-container">
            <Component />
            <a className="main-content-code-view" target="_blank" href={`${baseViewURL}${router.route}.tsx`}>
              view code
            </a>
          </div>
        </div>
      </div>
    )
  }
}