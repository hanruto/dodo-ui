import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from '../button'

const defaultAnimationDuration = 400
function createElementToDialogRoot() {
  let dialogRoot
  dialogRoot = document.getElementById('ze-dialog-root')
  if (!dialogRoot) {
    dialogRoot = document.createElement('div')
    dialogRoot.setAttribute('id', 'ze-dialog-root')

    const dialogMask = document.createElement('div')
    dialogMask.setAttribute('id', 'ze-dialog-mask')
    document.body.appendChild(dialogRoot)
    dialogRoot.appendChild(dialogMask)
  }
  const el = document.createElement('div')
  dialogRoot.appendChild(el);
  return el
}

interface Props {
  title?: string,
  visible?: boolean,
  onCancel?: any,
  onOk?: any,
  animationIn?: string
  animationDuration?: number
}
class DialogInner extends React.Component<Props> {
  render() {
    const { children, title, visible, onCancel, onOk, animationDuration = defaultAnimationDuration } = this.props

    return (
      <div style={{ animationDuration: animationDuration / 1000 + 's' }} className={classnames('ze-dialog', visible ? 'ze-dialog-animate-in' : 'ze-dialog-animate-out')}>
        <div className="ze-dialog-head">
          <div className="ze-dialog-title">{title}</div>
          <div className="ze-dialog-cancel-btn" onClick={onCancel}>+</div>
        </div>
        <div className="ze-dialog-content">
          {children}
        </div>
        <div className="ze-dialog-footer">
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onOk}>确定</Button>
        </div>
      </div>
    )
  }
}

const renderDialog = (el, props) => {
  const dialogRoot = document.getElementById('ze-dialog-root')
  const dialogMask = document.getElementById('ze-dialog-mask')

  dialogMask.style.display = 'block'
  dialogRoot.style.display = 'block'
  ReactDOM.render(<DialogInner {...props} />, el)
}

const unRenderDialog = (el) => {
  const dialogRoot = document.getElementById('ze-dialog-root')
  const dialogMask = document.getElementById('ze-dialog-mask')

  dialogRoot.removeChild(el);
  const hasDilog = dialogRoot.querySelector('.ze-dialog')
  if (!hasDilog) {
    dialogMask.style.display = 'none'
    dialogRoot.style.display = 'none'
  }
}

const open = option => {
  const props = { ...option }
  props.visible = true
  props.children = option.content

  const el = createElementToDialogRoot()
  const close = () => {
    props.visible = false
    renderDialog(el, props)
    setTimeout(() => unRenderDialog(el), props.animationDuration || defaultAnimationDuration)
  }
  props.onOk = e => {
    option.onOk ? option.onOk(e, close) : close()
  }
  props.onCancel = e => {
    option.ononCancel ? option.ononCancel(e, close) : close()
  }
  renderDialog(el, props)
}

class Dialog extends React.Component<Props> {
  el = null

  componentDidMount() {
    this.el = createElementToDialogRoot()
    renderDialog(this.el, this.props)
  }

  componentWillUnmount() {
    unRenderDialog(this.el)
  }

  componentDidUpdate() {
    renderDialog(this.el, this.props)

    if (!this.props.visible) {
      setTimeout(() => unRenderDialog(this.el), 400)
    }
  }

  static open = open

  render() {
    return null
  }
}

export default Dialog