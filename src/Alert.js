import React from 'react'
import './Alert.scss'

class Alert extends React.Component {
  render() {
    let { type, children } = this.props

    if (!children) return null

    return (
      <div className={`Alert`}>
        <div className={`notification ${type}`}>
          <div>{children}</div>
        </div>
      </div>
    )
  }
}

export default Alert
