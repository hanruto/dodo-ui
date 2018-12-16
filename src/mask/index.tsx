import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { getDOMById } from '../utils/tool'
import classnames from 'classnames'


const maskId = 'do-mask-root'
const transitionDuration = 600
interface Props {
  show: boolean
}
class Mask extends React.Component<Props>{
  render() {
    const { show = true } = this.props
    return (
      <div className={classnames("do-mask", show ? 'animate-fade-in' : 'animate-fade-out')} />
    )
  }
}

let closeTimer = null

const show = () => {
  ReactDOM.render(<Mask show={true} />, getDOMById(maskId))
  clearTimeout(closeTimer)
}

const hidden = () => {
  ReactDOM.render(<Mask show={false} />, getDOMById(maskId))
  
  closeTimer = setTimeout(
    () => ReactDOM.unmountComponentAtNode(getDOMById(maskId)),
    transitionDuration + 50
  )
}

const maskManager = {
  show, hidden,
}

export default maskManager