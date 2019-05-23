const path = require('path');
const {
    getFileByName
} = require('./file-utils');

const getContentType = (filename) => {
    return _CONTENT_TYPES[filename.substring(filename.lastIndexOf('.'))] || 'text/plain';
}

const createAppRouters = ({ app, directoryName, headers, rootFolderDist }) => {
    app
        .get(`/${directoryName}`, async (_, response) => {
            response
                .type('html')
                .set({
                    'Link': headers
                }).end('')
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