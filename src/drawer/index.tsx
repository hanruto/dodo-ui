import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import { getDOMById } from '../utils/tool'


const drawerRootId = 'do-drawer-root'

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
      <div className={classnames('do-drawer', open ? 'open' : 'close')}>
        <div className="do-drawer-container">
          <div
            className={classnames('do-drawer-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="do-drawer-toggle-bar"></span>
            <span className="do-drawer-toggle-bar"></span>
            <span className="do-drawer-toggle-bar"></span>
          </div>
          <div
            className={classnames('do-drawer-inner-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="do-drawer-toggle-bar"></span>
            <span className="do-drawer-toggle-bar"></span>
            <span className="do-drawer-toggle-bar"></span>
          </div>
          {children}
        </div>
        <div className="do-drawer-mask"></div>
      </div>
    )
  }
}

export default class Drawer extends React.Component {
  componentDidMount() {
    ReactDOM.render(<DrawerInner {...this.props} />, getDOMById(drawerRootId))
  }

  componentDidUpdate() {
    ReactDOM.render(<DrawerInner {...this.props} />, getDOMById(drawerRootId))
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(getDOMById(drawerRootId))
    document.body.removeChild(getDOMById(drawerRootId))
  }

  render() {
    return null
  }
}
