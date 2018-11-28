

import * as React from 'react'
import classnames from 'classnames'

interface Porps extends React.TextareaHTMLAttributes<HTMLInputElement> {
  error?: boolean
  label?: any
  message?: string
  width?: number
  fullWidth?: boolean
  classname?: string
}

export default class InputArea extends React.Component<any> {
  state = {
    focus: false,
    dirty: false,
  }

  $input: any = React.createRef()

  handleFocus = e => {
    this.setState({ focus: true })
    this.props.onFocus && this.props.onFocus(e)
  }

  handleBlur = e => {
    this.setState({ focus: false, dirty: true })
    this.props.onBlur && this.props.onBlur(e)
  }

  handleChange = e => {
    this.props.onChange && this.props.onChange(e)
  }

  setFocus = () => {
    this.$input.current.focus()
  }

  render() {
    const { label, rows, fullWidth, width, placeholder, ...rest } = this.props
    const { focus } = this.state
    return (
      <div
        onClick={() => this.setFocus()}
        style={{ width }}
        className={classnames(
          fullWidth && 'ze-input-area-full',
          label && 'ze-input-area-has-label',
          'ze-input-area'
        )}
      >
        <div className={'ze-input-wrapper' + (focus ? ' ze-focus' : '')}>
          {label && <label className="ze-input-label">{label}</label>}
          <textarea
            placeholder={placeholder}
            ref={this.$input}
            className="ze-input"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            {...rest}
          />
        </div>
      </div>
    )
  }
}
