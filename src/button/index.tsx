import * as React from 'react'
import Ripple from '../ripple'

/**
 * 1. 样式控制，是否需要shadow, border, 是否全宽度
 * 2. 类型控制 primary danger warning default success
 * 3. 
 */
interface Props {
    type?: string
    size?: number
    clickProtectDuration?: number
    disabled?: boolean
    style?: object
    className?: string
    onClick?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler

    fullWidth?: boolean
    shadow?: boolean
}

export default class Button extends React.Component<Props> {
    status = 1

    ripple: any = React.createRef()

    handleClick = e => {
        const { clickProtectDuration, disabled } = this.props
        if (!this.status || disabled) return false
        if (clickProtectDuration > 0) {
            this.status = 0
            setTimeout(() => this.status = 1, clickProtectDuration)
        }
        this.props.onClick && this.props.onClick(e)
    }

    handleMouseDown = e => {
        if (this.props.disabled) {
            return false
        }
        this.createRipple(e)
        this.props.onMouseDown && this.props.onMouseDown(e)
    }

    createRipple = e => {
        if (!this.status) return false
        this.ripple.current.createRipple(e)
    }

    render() {
        const {
            size,
            fullWidth = false,
            type,
            className,
            shadow,
            style,
            disabled
        } = this.props
        return (
            <button
                style={Object.assign({}, style)}
                onClick={this.handleClick}
                className={
                    'ze-clickable ze-btn'
                    + (className ? (' ' + className) : '')
                    + ((type && type !== 'defaut') ? (' ' + 'ze-btn-' + type) : '')
                    + ((size) ? (' ' + 'ze-btn-' + size) : '')
                    + (fullWidth ? (' ' + 'ze-btn-full') : '')
                    + (shadow ? (' ' + 'ze-btn-shadow') : '')
                    + (disabled ? (' ' + 'ze-btn-disabled') : '')
                }
                onMouseDown={this.handleMouseDown}
            >
                {this.props.children}
                <Ripple ref={this.ripple} />
            </button>
        )
    }
}





