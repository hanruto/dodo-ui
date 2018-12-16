import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import { getDOMById } from '../utils/tool'
class DrawerInner extends React.Component {
  state = {
    open: false
  }

  handleToggle = () => {
    const open = !this.state.open
    this.setState({ open })

    const app = document.getElementById('__next')
    app.style.transition = 'all ease .6s'
    if (window.innerWidth > 720) {
      app.style.width = open ? 'calc(100% - 340px)' : '100%'
    }
  }

  componentWillUnmount() {
    const app = document.getElementById('__next')
    app.style.width = '100%'
  }

  render() {
    const { open } = this.state
    const { children } = this.props

    return (
      <div className={classnames('w-drawer', open ? 'open' : 'close')}>
        <div className="w-drawer-container">
          <div
            className={classnames('w-drawer-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
          </div>
          <div
            className={classnames('w-drawer-inner-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
          </div>
          {children}
        </div>
        <div className="w-drawer-mask"></div>
      </div>
    )
  }
}

export default class Drawer extends React.Component {
  componentDidMount() {
    ReactDOM.render(<DrawerInner {...this.props} />, getDOMById('drawer-root'))
  }

  componentDidUpdate() {
    ReactDOM.render(<DrawerInner {...this.props} />, getDOMById('drawer-root'))
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(getDOMById('drawer-root'))
    document.body.removeChild(getDOMById('drawer-root'))
  }

  render() {
    return null
  }
}
