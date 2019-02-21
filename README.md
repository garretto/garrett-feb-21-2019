# Garrett - Feb 21, 2019

## Installation

To play with the app in dev mode:

```
yarn install
yarn start
```

If you want to build for production:

```
yarn build
```

## Security

Most vulnerabilities are with the mock API server, which I didn't spend too much time on.

### Addressed

- Avoids XSS: React automatically escapes inner html, so cannot have malicious file name for example.
- JSON from server is parsed using `response.json()` (similar to `JSON.parse()`)
- Basic escaping of user search query with encodeURIComponent
- No URL parameters can be used to inject runnable code on the frontend, e.g. /?a=javascript:alert('hi')

### Not Addressed

- Should use https and HSTS once we have a domain
- API currently does not check file size and file type, only frontend. Could also potentially be buffer overflowed.
- Frontend does not check the shape of data from server before putting it into the state. I think this will just throw an error but potentially could be hacked somehow.
- If we are going to publically host anyones files without authentication, should scan for malicious content after upload.
- Should do more to prevent CSRF attacks, can use one-time codes for form submits
- Not using Conternt Security Policy

## Improvements

Obviously this is not an exhuastive list, but:

- Upload progress bar
- Show thumbnail of the image
- Download image feature, both in API and frontend
- Pagination
- Better notifications that don't block the search bar
- A server that doesn't upload files into memory but rather into a temp directory
- A more condensed list for lots of files

## Libraries

```javascript
{
  "dependencies": {
    "body-parser": "^1.18.3", // API Server - to parse data in express
    "bulma": "^0.7.4", // Frontend - very small basic UI framework to make buttons and inputs look okay
    "express": "^4.16.4", // API Server - runs the mocking server
    "express-fileupload": "^1.1.1-alpha.3", // API Server - simple way to upload a file with express server
    "morgan": "^1.9.1", // API Server - used for logging
    "node-sass": "^4.11.0", // Frontend - SASS to parse scss files since I like namespacing components, sharing variables
    "react": "^16.8.2", // Frontend - UI Framework
    "react-dom": "^16.8.2", // Frontend - UI Framework
    "react-scripts": "2.1.5" // Frontend - create-react-app so I didnt spend all 48 hours setting up my project
  },
  "devDependencies": {
    "concurrently": "^4.1.0", // script to make it easy run frontend and backend at the same time
    "nodemon": "^1.18.10" // auto reloads node on file changes
  }
}
```

## API

I started off using a mocking service to mock a basic REST API, and then implemented my own express server since it's hard to find a mocking service that let's you upload a file.

### POST /file

Used to upload a new file. Must use a FormData object with a file included. The server will add the file to the DB. Returns the file metadata and database ID as a JSON payload.
HTTP Code: 200

If no file is uploaded server returns HTTP 400.

Sample JSON:

```json
{
  "name": "dxxT1xD5TzO8Y7u+1ZqqQA.jpg",
  "size": 2251014,
  "id": 1
}
```

### GET /file

Return a JSON payload containing all files.
HTTP Code: 200

Optional query parameter `q` to search the file names and return only matching files.

```
GET /file?q=spaghetti
```

Sample response:

```json
[
  { "name": "<script>alert(\"hi\")</script>", "size": 3928324, "id": 0 },
  { "name": "dxxT1xD5TzO8Y7u+1ZqqQA.jpg", "size": 2251014, "id": 1 }
]
```

### GET /file/:id

If file exists, returns a JSON payload only containing this file.
HTTP Code: 200

If file doesn't exist, returns an empty JSON payload.
HTTP Code: 404

### DELETE /file/:id

If file exists, removes file from the db and returns an empty JSON payload.
HTTP Code: 200

If file doesn't exist, returns an empty JSON payload.
HTTP Code: 404

---

## Other notes

The API server is intended to mock what I needed out of a basic REST API and doesn't reflect anything near production quality.

I would have liked to have had time to work more on the design.

# Create React App Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
