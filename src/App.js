import React, { Component } from 'react'
import './App.scss'
import FileList from './FileList.js'
import Header from './Header.js'
import Alert from './Alert.js'
import { listFiles, deleteFile, search, upload } from './api.js'

const SEARCH_DELAY_MS = 500

class App extends Component {
  constructor(props) {
    super(props)

    this.refreshFiles = this.refreshFiles.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
    this.showAlert = this.showAlert.bind(this)
  }

  state = {
    files: [],
    fetching: false,
    deleting: [],
    query: '',
    delayTimeout: null,
    uploading: false,
    alertType: null,
    alertText: null,
    alertTimeout: null,
  }

  componentDidMount() {
    this.refreshFiles()
  }

  showAlert(alertText, alertType) {
    clearTimeout(this.state.alertTimeout)
    this.setState({
      alertText,
      alertType,
      alertTimeout: setTimeout(() => {
        this.setState({ alertText: null })
      }, 1500),
    })
  }

  handleFileInput(event) {
    let file = event.target.files[0]
    if (!file) {
      // cancel
      return
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.showAlert('File must be a JPEG or PNG.', 'is-danger')
      return
    }

    if (file.size > 10 * 1000 * 1000) {
      this.showAlert('File must not exceed 10mb.', 'is-danger')
      return
    }

    this.setState({ uploading: true })
    upload(file)
      .then(res => {
        this.setState({ uploading: false })
        this.showAlert('Upload succeeded.', 'is-success')
        this.refreshFiles()
      })
      .catch(err => {
        this.setState({ uploading: false })
        this.showAlert('Upload failed.', 'is-danger')
      })

    this.setState({ file })
  }

  refreshFiles(query) {
    this.setState({ fetching: true })

    let func = query ? search(query) : listFiles()
    func.then(files => {
      // Do not update results if query has changed
      if (query && this.state.query !== query) return

      let totalSize = files.reduce((prev, curr) => prev + curr.size, 0)
      this.setState({
        files,
        totalSize,
        fetching: false,
        deleting: [],
      })
    })
  }

  onDelete(id) {
    let deleting = [...this.state.deleting, id]
    this.setState({ deleting })
    deleteFile(id)
      .then(res => {
        this.showAlert('File deleted.', 'is-success')
        this.refreshFiles()
      })
      .catch(err => {
        this.showAlert('File not deleted.', 'is-danger')
        this.refreshFiles()
      })
  }

  handleSearchChange(event) {
    clearTimeout(this.state.delayTimeout)
    let query = event.target.value

    this.setState({
      query,
      delayTimeout: setTimeout(
        async () => this.refreshFiles(query),
        SEARCH_DELAY_MS
      ),
    })
  }

  render() {
    let {
      alertType,
      alertText,
      files,
      totalSize,
      fetching,
      query,
      deleting,
      uploading,
    } = this.state
    return (
      <div className="App">
        <Header
          uploading={uploading}
          handleFileInput={this.handleFileInput}
          fetching={fetching}
          handleSearchChange={this.handleSearchChange}
          query={query}
        />
        <FileList
          files={files}
          totalSize={totalSize}
          fetching={fetching}
          onDelete={this.onDelete}
          deleting={deleting}
        />
        <Alert type={`${alertType}`}>{alertText}</Alert>
      </div>
    )
  }
}

export default App
