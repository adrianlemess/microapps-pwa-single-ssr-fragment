const { readFileSync } = require('fs');
const { renderToNodeStream } = require('react-dom/server');

const {
    getFileByNameStreaming
} = require('./file-utils');
const renderStream = require('./render-stream.js')

const getContentType = (filename) => {
    return _CONTENT_TYPES[filename.substring(filename.lastIndexOf('.'))] || 'text/plain';
}

const createAppRouters = ({ app, directoryName, headers, rootFolderDist, mapFiles }) => {
    let template = null;
    if (directoryName.includes('header')) {
        template = mapFiles[`${directoryName}-index.html`]
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
            response.write(`
                <script>window['header'] = ${JSON.stringify({}).replace(/</g, '\\\u003c')}</script>
            `)
            if (template) {
                const stream = renderToNodeStream(renderStream());
                stream.pipe(response)
                // When React finishes rendering send the rest of your HTML to the browser
                // stream.on('end', () => {
                //     console.log('finished')
                //     response.end('</div></body></html>');
                // });
            } else {
                response.end('')
            }

        })
        .get(`/${directoryName}/:fileName*`, (req, res) => {
            let fileName = req.params.fileName;
            res.header("Content-Type", getContentType(fileName));
            
            if (fileName.includes('-')) {
                fileName = fileName.replace('-', '/');
            }
            try {
                // Put everything in HashMap and calling hashMap
                console.log('fileName', `${directoryName}-${fileName}`);
                Object.keys(mapFiles).forEach(key => console.log('key', key));
                if (fileName.includes('.js')) {
                    const file = mapFiles[`${directoryName}-${fileName}`];
                    return res.send(file);
                }
                const response = getFileByNameStreaming(`${rootFolderDist}/${directoryName}/`, fileName);
                response.pipe(res);
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