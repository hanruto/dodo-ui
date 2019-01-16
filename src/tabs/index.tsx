import * as React from 'react'
import { findDOMNode } from 'react-dom'
import Ripple from '../ripple'
import classnames from 'classnames'


interface TabProps {
  value?: string | number
  active?: boolean
  onClick?: React.MouseEventHandler
  width?: number
  className?: string
  style?: any
  changeBarToTab?: Function
  type?: string
}

class Tab extends React.Component<TabProps> {
  tab: any = React.createRef()
  ripple: any = React.createRef()

  createRipple = e => {
    this.ripple.current.createRipple(e)
  }

  render() {
    const { active, onClick, style, width, type } = this.props

    return (
      <div
        className={classnames('ze-tab', type !== 'easy' && 'ze-clickable', active && 'ze-active')}
        onMouseDown={e => type !== 'easy' && this.createRipple(e)}
        onClick={onClick}
        style={Object.assign({}, style, { width })}
        ref={this.tab}
      >
        {this.props.children}
        {type !== 'easy' && <Ripple ref={this.ripple} />}
      </div>
    )
  }
}

/**
 * 1. 设置tab的label和value
 * 2. onChange 方法回调
 */
interface TabsProps {
  value?: string | number
  onChange?: Function
  width?: number
  className?: string
  style?: any
  type?: string
}
export default class Tabs extends React.Component<TabsProps> {
  activeBar: any = React.createRef()
  activeTab: any = React.createRef()

  static Item = Tab

  componentDidUpdate() {
    this.handleChangeBar()
  }

  handleClickTab = (_, value, index) => {
    if (this.props.onChange) {
      this.props.onChange(value, index)
    }
  }

  componentDidMount() {
    this.handleChangeBar()
  }

  handleChangeBar = () => {
    if (this.activeTab.current) {
      const el: any = findDOMNode(this.activeTab.current)
      const { offsetWidth, offsetLeft } = el
      this.activeBar.current.style.width = offsetWidth + 'px'
      this.activeBar.current.style.left = offsetLeft + 'px'
    }
  }

  render() {
    const { children, value, type } = this.props
    return (
      <div className={classnames("ze-tabs", type && "ze-tabs-" + type)}>
        {
          children &&
          React.Children.map(children,
            (child: any, index) => {
              const tabValue = child.props.value || index
              const active = tabValue === value

              return React.cloneElement(child, {
                onClick: e => {
                  this.handleClickTab(e, tabValue, index)
                  child.props.onClick && child.props.onClick(e)
                },
                active: active,
                ref: active ? this.activeTab : null,
                value: tabValue,
                type
              })
            }
          )
        }
        <div className="ze-tab-bar" ref={this.activeBar} />
      </div>
    )
  }
}
