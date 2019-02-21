const BASE_URL = '/'

export function listFiles() {
  return fetch(`${BASE_URL}file`).then(
    checkOkJson
  )
}

export function deleteFile(id) {
  return fetch(`${BASE_URL}file/${id}`, {
    method: 'DELETE',
  }).then(checkOkJson)
}

export function search(query) {
  query = encodeURIComponent(query)
  return fetch(
    `${BASE_URL}file?q=${query}`
  ).then(checkOkJson)
}

export function upload(file) {
  let data = new FormData()
  data.append('file', file, file.name)
  return fetch(`${BASE_URL}file`, {
    method: 'POST',
    body: data,
  }).then(checkOkJson)
}

function checkOkJson(res) {
  if (!res.ok) {
    throw new Error('Request failed.')
  }
  return res.json()
}
