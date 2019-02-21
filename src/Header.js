import React, { Component } from 'react'
import './Header.scss'

class Header extends Component {  
  constructor(props) {
    super(props)

    this.handleFileInput = this.handleFileInput.bind(this)
    
    this.inputRef = React.createRef()
  }

  handleFileInput(event) {
    this.props.handleFileInput(event)
    this.inputRef.current.value = null
  }

  render() {
    let { fetching, handleSearchChange, query, uploading } = this.props

    return (
      <div className="Header">
        <div className={`search control ${fetching ? 'is-loading' : ''}`}>
          <input
            onChange={handleSearchChange}
            value={query}
            type="text"
            placeholder="Search documents"
            className="input"
          />
        </div>
        <div className="upload">
          <input ref={this.inputRef} type="file" id="fileupload" onChange={this.handleFileInput} disabled={uploading} />
          <label htmlFor="fileupload" className={`button is-link ${uploading ? 'is-loading' : ''}`} disabled={uploading}>
            UPLOAD
          </label>
        </div>
      </div>
    )
  }
}

export default Header
