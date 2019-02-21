import React, { Component } from 'react'
import './FileList.scss'
import FileCard from './FileCard.js'
import { humanReadableSize } from './utils.js'

class FileList extends Component {
  // componentDidMount() {
  //   debugger;
  // }
  render() {
    let { files, totalSize, deleting, onDelete } = this.props

    return (
      <div className="FileList">
        <div className="file-list-header">
          <h1>
            {files.length === 1 ? '1 Document' : `${files.length} Documents`}
          </h1>
          <div>Total size: {humanReadableSize(totalSize)}</div>
        </div>
        <div className="file-grid">
          {files.map(file => (
            <FileCard
              key={file.id}
              name={file.name}
              bytes={file.size}
              onDelete={() => onDelete(file.id)}
              deleting={deleting.includes(file.id)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default FileList
