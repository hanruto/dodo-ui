import React from 'react'
import classnames from 'classnames'


export default class Icon extends React.Component {
  render() {
    const { type } = this.props

    return (
      <span className="ze-icon">
        <svg className={classnames(`ze-icon-${type}`, 'ze-icon-svg')}>
          <path></path>
          <path></path>
          <path></path>
        </svg>
      </span>
    )
  }
}