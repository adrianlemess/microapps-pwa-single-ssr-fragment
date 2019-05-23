const Tailor = require('node-tailor');
const express = require('express');

const app = express();
const tailorInstance = new Tailor({
    maxAssetLinks: 20,
    templatesPath: __dirname + '/pages'
})

const PORT = process.env.PORT || 10000;

app.use(express.static(__dirname + '/public'))

app.get('/*', (req, res) => {
    if (req.url === '/') {
        req.url = '/index'
    }
    req.headers['x-request-uri'] = req.url
    return tailorInstance.requestHandler(req, res)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});