// GET  folders name
// transform each father directory into a request
// create a function to create headers
const express = require('express');
const { readFileSync } = require('fs')
const { basename, join } = require('path')
// const { renderToNodeStream } = require('react-dom/server.js')

const environment = require('./environment.js')
const app = express()
const loadResourcesToStore = require('./server/react/store')
const { serverSideApplication } = require('./dist/bundle.server.js')
const { client } = require('./dist/webpack-assets.json')

// @todo apka kliencka, dev mode
// @todo optimize webpack
// @todo environment variables from webpack, bez package.json
// @todo absolute path w node i react

const filename = basename(client.js)
const template = readFileSync('dist/index.html', 'utf8')

const clientScript = readFileSync(join('dist', filename), 'utf8')
// const { application, store } = serverSideApplication()

app
  .get('/favicon.ico', (_, response) => response
    .type('ico')
    .send(null)
  )
  .get(`/${filename}`, (_, response) => response
    .type('js')
    .send(clientScript)
  )
  .get('/', async (_, response) => {
    response
      .type('html')
      .set({
        'Link': `<${client.js}>; rel="fragment-script"`
      })
      .write(template)

    response
      .write(htmlState)

    renderToNodeStream(application)
      .pipe(response)
  })
  .listen(environment.port)
