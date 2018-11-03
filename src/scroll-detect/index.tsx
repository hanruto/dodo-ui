import * as React from 'react'

interface Props {
  onScrollInto: Function
  onScrollOut: Function
}
export default class ScrollDetect extends React.Component<Props> {
  el: any = React.createRef()

  componentDidMount() {
    this.handleDetect()
    const scrollEl = document.querySelector('.main-content')
    scrollEl.addEventListener('scroll', () => {
      this.handleDetect()
    })
  }

  handleDetect = () => {
    const show = 100
    const { top, bottom } = this.el.current.getBoundingClientRect()
    if ((top > show && top < (window.innerHeight - show)) || (bottom > show && bottom < (window.innerHeight - show))) {
      this.props.onScrollInto && this.props.onScrollInto()
    } else {
      this.props.onScrollOut && this.props.onScrollOut()
    }
  }

  render() {
    return (
      <div className="ze-scroll-detect" ref={this.el}>{this.props.children}</div>
    )
  }
}