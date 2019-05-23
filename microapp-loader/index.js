// GET  folders name
// transform each father directory into a request
// create a function to create headers

const {
  join
} = require('path')
const express = require('express');

const {
  getDirectoriesName,
  readFilesRecursively
} = require('./utils/file-utils');
const {
  buildLinkHeader,
  createAppRouters
} = require('./utils/http-utils');
const PORT = process.env.PORT || 4000;
const app = express()
const ROUTE = process.env.ROUTE || `http://localhost:${PORT}`;
const ROOT_FOLDER_DISTS = 'dists';

app.get('/favicon.ico', (_, response) => response
  .type('ico')
  .send(null)
);

const directories = getDirectoriesName(ROOT_FOLDER_DISTS);

if (directories.length === 0) {
  throw new Error('No bundles to mapping');
}

for (let i = 0; i < directories.length; i++) {
  const directoryName = directories[i];
  const filesPath = readFilesRecursively(join(__dirname, ROOT_FOLDER_DISTS, directoryName));
  const headers = buildLinkHeader(filesPath, `${ROUTE}/${directoryName}`, `${ROUTE}/`)
  createAppRouters(
    {
      app, 
      directoryName, 
      headers, 
      rootFolderDist: ROOT_FOLDER_DISTS
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})