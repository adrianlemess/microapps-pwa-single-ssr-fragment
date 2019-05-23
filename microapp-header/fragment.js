const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const DIST = process.env.DIST || process.argv[2] || 'dist';

const FULL_DIST_PATH = path.join(__dirname, `/${DIST}`);

const PORT = process.env.PORT || 4000;

const ROUTE = process.env.ROUTE || `http://localhost:${PORT}`;

const CONTENT_TYPES = {
  '.js': 'application/javascript',
  '.map': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.otf': 'font/otf',
  '.eot': 'font/eot',
  '.ttf': 'font/ttf'
};

function readFilesRecursively(distPath) {
  console.log('distPath', distPath);
  let filesMapped = [];
  const files = fs.readdirSync(distPath);

  if (!files.length) return filesMapped;
  for (let i = 0; i < files.length; i++) {
    const file = path.resolve(distPath, files[i]);

    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      const results = readFilesRecursively(file);

      filesMapped = [...filesMapped, ...results];
    } else {
    //   console.log('FULL_DIST_PATH', FULL_DIST_PATH);
    //   console.log(file)
      const fileMapped = file.split(`${FULL_DIST_PATH}/`);

      filesMapped.push(fileMapped[1]);
    }
  }
  return filesMapped;
}

function buildLinkHeader() {
//   console.log(FULL_DIST_PATH + '%%%%%%%%%%%%%%%%%%%%%%%%%%55');
  let files = readFilesRecursively(FULL_DIST_PATH);
  let rel = 'fragment-script';
     return files.map((file) => {
    //   console.log(file);
      let rel = 'fragment-script';
      let ending = file.substring(file.lastIndexOf('.'));
      switch (ending) {
        case '.css':
          rel = 'stylesheet'
          break;
        case '.png':
          rel = 'images';
          break;
      }
      if (ending !== '.html') {
        return `<${ROUTE}/${DIST}/${file}>;rel="${rel}"`;
      }

    }).filter(element => !!element).join(',');
}


const LINK = `${buildLinkHeader()},`;

function serve(req, res, startDate) {

  let path = url.parse(req.url).pathname;
  let filepath = __dirname + path;

  fs.exists(filepath, (exists) => {
    console.log('Link Headers ', LINK);
    if (path === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Link': LINK
      });

      res.end(``);
    } else {
      let ct = CONTENT_TYPES[path.substring(path.lastIndexOf('.'))] || 'text/plain';
      res.writeHead(200, {
        'Content-Type': ct
      });
      return fs.createReadStream(filepath).pipe(res);

    }
  });

  let endDate = new Date();
  let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  console.log(req.url + '---' + 'Time until DOMready: ' + seconds)
}

const server = http.createServer((req, res) => {
  let startDate = new Date();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  serve(req, res, startDate);

});

server.listen(PORT, () => {
  console.log(`fragment server is waiting on port ${PORT}`)
});