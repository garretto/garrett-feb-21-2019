import React from 'react'
import './FileCard.scss'
import { humanReadableSize } from './utils.js'

class FileCard extends React.Component {
  render() {
    let { name, bytes, onDelete, deleting } = this.props

    let loading = deleting ? 'is-loading' : ''

    return (
      <div className="FileCard">
        <h2>{name}</h2>
        <div className="file-details">
          <div className="file-size">{humanReadableSize(bytes)}</div>
          <button disabled={deleting} onClick={onDelete} className={`button is-danger is-outlined ${loading}`} style={{width: 80}}>
            delete
          </button>
        </div>
      </div>
    )
  }
}

export default FileCard
