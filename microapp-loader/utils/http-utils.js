const { readFileSync } = require('fs');
const { renderToNodeStream } = require('react-dom/server');

const {
    getFileByName
} = require('./file-utils');
const renderStream = require('./render-stream.js')

const getContentType = (filename) => {
    return _CONTENT_TYPES[filename.substring(filename.lastIndexOf('.'))] || 'text/plain';
}

const createAppRouters = ({ app, directoryName, headers, rootFolderDist }) => {
    let template = null;
    if (directoryName.includes('header')) {
        template = readFileSync(`${rootFolderDist}/${directoryName}/index.html`, 'utf8')
    }

    app
        .get(`/${directoryName}`, async (_, response) => {
            response
                .type('html')
                .set({
                    'Link': headers
                })
                if (template) {
                    response
                        .write(template)
                }

            // response
            // .write(`
            //     <script>window['header'] = ${JSON.stringify({}).replace(/</g, '\\\u003c')}</script>
            // `)
            if (template) {
                renderStream().pipe(response)
            } else {
                response.end('')
            }

        })
        .get(`/${directoryName}/:fileName*`, (req, res) => {
            let fileName = req.params.fileName;
            console.log(fileName);
            res.header("Content-Type", getContentType(fileName));
            
            if (fileName.includes('-')) {
                fileName = fileName.replace('-', '/');
            }
            try {
                const response = getFileByName(`${rootFolderDist}/${directoryName}/`, fileName);
                return response.pipe(res);
            } catch (err) {
                res.status(500).send(err.message);
            }
        })
}

const buildLinkHeader = (files, ROUTE) => {
    return files.reduce((acc, currentFile) => {
        const ending = currentFile.substring(currentFile.lastIndexOf('.'));
        let rel = 'fragment-script';

        switch (ending) {
            case '.css':
                rel = 'stylesheet'
                break;
            case '.png':
                rel = 'images';
                break;
        }
        if (ending !== '.html') {
            return `<${ROUTE}/${currentFile}>;rel="${rel}", ${acc}`;
        }

        return acc;
    }, '');
}

const _CONTENT_TYPES = {
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

module.exports = {
    buildLinkHeader,
    createAppRouters
}