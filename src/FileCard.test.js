import React from 'react'
import ReactDOM from 'react-dom'
import FileCard from './FileCard.js'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FileCard />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const tree = renderer
    .create(
      <FileCard
        name="FileName.jpg"
        bytes="1000000"
        onDelete={() => console.log('delete')}
        deleting={false}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders deleting correctly', () => {
  const tree = renderer
    .create(
      <FileCard
        name="FileName.jpg"
        bytes="1000000"
        onDelete={() => console.log('delete')}
        deleting={true}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
