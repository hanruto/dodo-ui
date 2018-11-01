import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import './style.scss'
import '../styles/index.scss'
import classnames from 'classnames'


const menus = [
  { name: '试用', href: '/use' },
  { name: '设计', href: '/design' }
]
const componentMenus = [
  { name: 'Button', href: '/components/button' },
  { name: 'Input', href: '/components/input' },
  { name: 'Dialog', href: '/components/dialog' },
  { name: 'Table', href: '/components/table' },
  { name: 'Tabs', href: '/components/tabs' },
  { name: 'AnimateQueue', href: '/components/aniamte-queue' }
]

export default function (Component) {
  class Layout extends React.Component {
    render() {
      const { url: { pathname } } = this.props

      return (
        <div className="main-layout">
          <div className="main-nav">
            {
              menus.map((item, index) => (
                <div className="main-nav-item" key={index}>
                  <div className="main-nav-toggle">
                    <Link href={item.href}><a className={classnames(pathname === item.href && 'active')}>{item.name}</a></Link>
                  </div>
                </div>
              ))
            }
            <div className="main-nav-item">
              <div className="main-nav-toggle">组件展示</div>
              <ul>
                {
                  componentMenus.map((item, index) => (
                    <li className="main-nav-sub-item" key={index}>
                      <Link href={item.href}><a className={classnames(pathname === item.href && 'active')}>{item.name}</a></Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="main-content">
            <Component />
          </div>
        </div>
      )
    }
  }

  return withRouter(Layout)
}