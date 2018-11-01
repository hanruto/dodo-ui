import React, { Component } from 'react'

interface Props {
    head?: any
    isShow?: boolean
    onChange?: Function
    beforeChange?: Function
    style?: any
    className?: string
}
export default class Collapse extends Component<Props> {
    duration = 300

    panelWrapper: any = React.createRef()
    panel: any = React.createRef()
    panelHeight = 0

    state = {
        isShow: this.props.isShow,
        status: this.props.isShow ? 2 : 0  // 三种状态 0 收起, 1 展开中, 2 展开完毕
    }

    handleCollapse = () => {
        const { isShow, status } = this.state
        const _handleToggle = isShow => {
            if (this.props.onChange) {
                this.props.onChange(isShow)
            }
        }
        const _handleBeforeToggle = isShow => {
            if (this.props.beforeChange) {
                this.props.beforeChange(isShow)
            }
        }
        if (status === 1) return false
        if (isShow) {
            _handleBeforeToggle(false)
            this.setState({
                isShow: false,
                status: 1
            })
            setTimeout(() => this.setState({ status: 0 }, () => _handleToggle(false)), this.duration)
        } else {
            _handleBeforeToggle(true)
            this.setState({
                isShow: true,
                status: 1
            })
            setTimeout(() => this.setState({ status: 2 }, () => _handleToggle(true)), this.duration)
        }
    }

    componentDidMount() {
        const panelHeight = this.panel.current.offsetHeight
        this.panelHeight = panelHeight
        // 在默认情况下我们使用'auto'的height作为展开的高度，但是他是没有动画效果的，为此我们将高度提前转化为px
        if (this.state.isShow) {
            this.panelWrapper.current.style.height = panelHeight + 'px'
        }
    }

    render() {
        const { head, style, children, className } = this.props
        const { isShow, status } = this.state
        return (
            <div className={'ze-collapse' + (className ? ' ' + className : '')} style={style}>
                {head && <div
                    className={'ze-collapse-head ze-clickable'}
                    onClick={this.handleCollapse}
                >
                    {head}
                </div>}
                <div
                    ref={this.panelWrapper}
                    className={'ze-collapse-body' + (status === 0 ? ' collapsed' : '')}
                    style={{
                        height: isShow ? (this.panelHeight || 'auto') : 0,
                        transitionDuration: this.duration / 1000 + 's',
                        transitionTimingFunction: 'ease'
                    }}
                >
                    <div className="ze-collapse-body-content" ref={this.panel}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}
