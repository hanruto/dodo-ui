import React, { Component } from 'react'
import Collapse from '../collapse'
import Ripple from '../ripple'

interface MenuProps {
    menuIndex?: number
    onClick?: React.MouseEventHandler,
    active?: boolean,
    className?: string,
    _key?: string
}
export class MenuItem extends Component<MenuProps> {
    ripple: any = React.createRef()

    createRipple = e => {
        this.ripple.current.createRipple(e)
    }

    render() {
        const { children, onClick, active, className } = this.props
        return (
            <div
                className={
                    'ze-menu-item ze-clickable'
                    + (active ? ' ze-active' : '')
                    + (className ? ' ' + className : '')
                }
                onClick={onClick}
                onMouseDown={this.createRipple}
            >
                {children}
                <Ripple ref={this.ripple} />
            </div>
        )
    }
}

interface SubMenuProps {
    title: string
}
export class SubMenu extends Component<SubMenuProps> {
    state = {
        isShow: false
    }

    handleBeforeToggle = isShow => {
        this.setState({ isShow })
    }

    render() {
        const { children, title } = this.props
        const { isShow } = this.state
        return (
            <Collapse
                isShow={false}
                beforeChange={this.handleBeforeToggle}
                head={(
                    <MenuItem>
                        {title}
                        <span className="ze-pull-right">{isShow ? '+' : '-'}</span>
                    </MenuItem>
                )}
                className='ze-sub-menu-list'
            >
                {
                    children && React.Children.map(children,
                        (child: any) => React.cloneElement(child, {
                            className: 'ze-sub-menu-item'
                        })
                    )
                }
            </Collapse>
        )
    }
}

interface MenusProps {
    width?: number
}
export class MenuList extends Component<MenusProps> {
    menuCount = 0
    activeBar: any = React.createRef()

    state = {
        activeIndex: 0
    }

    handleMenuChange = (e, activeIndex) => {
        this.setState({ activeIndex })
        const { offsetHeight, offsetTop } = e.currentTarget
        this.activeBar.current.style.top = offsetTop + 'px'
        this.activeBar.current.style.height = offsetHeight + 'px'
    }

    MapMenu = (children) => {
        if (!children) return false
        const { activeIndex } = this.state

        return React.Children.map(children,
            (child: any) => {
                if (child.type && child.type.name === 'SubMenu') {
                    return React.cloneElement(child, {
                        children: this.MapMenu(child.props.children),
                    })
                }
                return React.cloneElement(child, {
                    onClick: e => this.handleMenuChange(e, child.props._key),
                    active: child.props._key.toString() === activeIndex.toString()
                })
            }
        )
    }

    render() {
        const { children } = this.props
        return (
            <div
                className="ze-menu-list"
            >
                {this.MapMenu(children)}
                <div className="ze-menus-bar" ref={this.activeBar} />
            </div>
        )
    }
}
