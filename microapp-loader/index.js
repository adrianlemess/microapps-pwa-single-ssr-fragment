// GET  folders name
// transform each father directory into a request
// create a function to create headers

const {
  join
} = require('path')
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const {
  getDirectoriesName,
  readFilesRecursively,
  getFileByName
} = require('./utils/file-utils');
const {
  buildLinkHeader,
  createAppRouters
} = require('./utils/http-utils');
const PORT = process.env.PORT || 4000;
const app = express()
const ROUTE = process.env.ROUTE || `http://localhost:${PORT}`;
const ROOT_FOLDER_DISTS = 'dists';

const SixMonths = 15778476000;
app.use(compression());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({
  'maxAge': SixMonths,
  'includeSubDomains': true,
  'force': true
}));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/favicon.ico', (_, response) => response
  .type('ico')
  .send(null)
);

const getFilesCached = (filesPath, directoryName) => 
  filesPath.reduce((prev, curr) => {
    if (curr.includes('.js') || curr.includes('.html')) {
      console.log(`${directoryName}-${curr}`);
      return {
        ...prev,
        [`${directoryName}-${curr}`]: { 
            file: getFileByName(`${ROOT_FOLDER_DISTS}/${directoryName}/`, curr),
            component: curr.includes('server') ? 
              require(`./${ROOT_FOLDER_DISTS}/${directoryName}/${curr}`) : null
        }
      };
    }
    return { ...prev };
  }, {});


const directories = getDirectoriesName(ROOT_FOLDER_DISTS);

if (directories.length === 0) {
  throw new Error('No bundles to mapping');
}

for (let i = 0; i < directories.length; i++) {
  const directoryName = directories[i];
  const filesPath = readFilesRecursively(join(__dirname, ROOT_FOLDER_DISTS, directoryName));
  const headers = buildLinkHeader(filesPath, `${ROUTE}/${directoryName}`, `${ROUTE}/`)
  const mapFiles = getFilesCached(filesPath, directoryName);
  createAppRouters(
    {
      app, 
      directoryName, 
      headers, 
      rootFolderDist: ROOT_FOLDER_DISTS,
      mapFiles
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})