
import * as React from 'react'
import classnames from 'classnames'

function checkIsValid(value) {
    if (value) return true
    if (value === 0) return true
    if (value === '') return false
    if (typeof value === 'object' && !value) return false
    if (value === undefined) return false
}

interface Porps {
    error?: boolean
    label?: any
    message?: string
    width?: number
    fullWidth?: boolean
    classname?: string
}

export default class Input extends React.Component<Porps & React.InputHTMLAttributes<HTMLInputElement>> {
    state = {
        focus: false,
        dirty: false,
        hasValue: checkIsValid(this.props.value || this.props.defaultValue)
    }

    $input: any = React.createRef()

    handleFocus = e => {
        this.setState({ focus: true })
        this.props.onFocus && this.props.onFocus(e)
    }

    handleBlur = e => {
        this.setState({ focus: false, dirty: true })
        this.props.onFocus && this.props.onFocus(e)
    }

    handleChange = e => {
        this.props.onChange && this.props.onChange(e)
        this.setState({ hasValue: checkIsValid(e.target.value) })
    }

    setFocus = () => {
        this.$input.current.focus()
    }

    render() {
        const { error, label, message, classname, required, disabled, fullWidth, width, ...rest } = this.props
        const { focus, hasValue } = this.state
        return (
            <div
                onClick={() => this.setFocus()}
                style={{ width }}
                className={classnames(
                    'ze-input-container',
                    fullWidth && 'ze-input-container-full',
                    label && 'ze-input-container-has-label',
                    classname
                )}
            >
                <div className={'ze-input-wrapper'
                    + (hasValue ? ' ze-has-value' : '')
                    + (focus ? ' ze-focus' : '')
                    + (error ? ' ze-error' : '')
                    + (required ? ' ze-required' : '')
                    + (disabled ? ' ze-disabled' : '')}>
                    {label && <label className="ze-input-label">{label}</label>}
                    <input
                        {...rest}
                        ref={this.$input}
                        disabled={disabled}
                        className="ze-input"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                </div>
                {message && <div className="ze-input-message">{message}</div>}
            </div>
        )
    }
}