const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(
  fileUpload({
    safeFileNames: true,
  })
)

// Mock data
let nextId = 7
const db = {
  file: [
    {
      name: '<script>alert("hi")</script>',
      size: 3928324,
      id: 0,
    },
    {
      name: 'dxxT1xD5TzO8Y7u+1ZqqQA.jpg',
      size: 2251014,
      id: 1,
    },
    {
      name: 'Kv3lVmBURGilOwy+n9LgMg.jpg',
      size: 2181425,
      id: 2,
    },
    {
      name: 'Kv3lVmBURGilOwy+n9LgMg.jpg',
      size: 2181425,
      id: 3,
    },
    {
      name: 'sbIxMBWVR46FV9qyWNHqSA.jpg',
      size: 3167154,
      id: 4,
    },
    {
      name: 'dxxT1xD5TzO8Y7u+1ZqqQA.jpg',
      size: 2251014,
      id: 5,
    },
    {
      name: '3xZABZJUS8WfMVgYbWcmLA.jpg',
      size: 2928324,
      id: 6,
    },
  ],
}

app.post('/file', function(req, res) {
  if (Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  let file = req.files.file

  let fileEntry = {
    id: nextId++,
    size: file.size,
    name: file.name,
  }

  db.file.push(fileEntry)

  // Not storing file for mock server, could save and return a url in the payload later
  res.status(200).send(fileEntry)

  // file.mv(`./files/${file.name}.jpg`, function(err) {
  //   if (err) return res.status(500).send(err)
  //   res.status(200).send(fileEntry)
  // })
})

app.get('/file', function(req, res) {
  let result = db.file

  if (req.query.q) {
    console.log(req.query)
    result = result.filter(file =>
      file.name.toLowerCase().includes(req.query.q.toLowerCase())
    )
  }

  res.status(200).send(result)
})

app.get('/file/:id', function(req, res) {
  const id = parseInt(req.params.id, 10)

  let fileIndex = null
  db.file.forEach((file, index) => {
    if (file.id === id) {
      fileIndex = index
    }
  })

  if (fileIndex !== null) {
    return res.status(200).send(db.file[fileIndex])
  }

  return res.status(404).send({})
})

app.delete('/file/:id', function(req, res) {
  const id = parseInt(req.params.id, 10)
  let fileIndex = null
  db.file.forEach((file, index) => {
    if (file.id === id) {
      fileIndex = index
    }
  })

  if (fileIndex !== null) {
    db.file.splice(fileIndex, 1)
    return res.status(200).send({})
  }

  return res.status(404).send({})
})

app.listen(3001, function() {
  console.log('App listening on port 3001.')
})
