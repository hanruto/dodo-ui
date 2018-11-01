import React, { Component } from 'react'
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
}

export class Tab extends Component<TabProps> {
  tab: any = React.createRef()

  ripple: any = React.createRef()

  createRipple = e => {
    this.ripple.current.createRipple(e)
  }

  render() {
    const { active, onClick, style, width } = this.props
    return (
      <div
        className={'ze-tab ze-clickable'
          + (active ? (' ' + 'ze-active') : '')
        }
        onMouseDown={this.createRipple}
        onClick={onClick}
        style={Object.assign({}, style, { width })}
        ref={this.tab}
      >
        {this.props.children}
        <Ripple ref={this.ripple} />
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
export class Tabs extends Component<TabsProps> {
  activeBar: any = React.createRef()
  activeTab: any = React.createRef()

  componentDidUpdate() {
    this.handleChangeBar()
  }

  handleClickTab = (e, value, index) => {
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
    const { children, value = 0, type } = this.props
    return (
      <div
        className={classnames("ze-tabs", type && "ze-tabs-" + type)}
      >
        {
          children &&
          React.Children.map(children,
            (child: any, index) => {
              const tabValue = child.props.value || index
              const active = tabValue === value

              return React.cloneElement(child, {
                onClick: e => this.handleClickTab(e, tabValue, index),
                active: active,
                ref: active ? this.activeTab : null,
                value: tabValue
              })
            }
          )
        }
        <div className="ze-tab-bar" ref={this.activeBar} />
      </div>
    )
  }
}
