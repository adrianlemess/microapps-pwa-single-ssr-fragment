const Tailor = require('node-tailor');
const express = require('express');
const filterReqHeadersFn = require('node-tailor/lib/filter-headers.js')

const fragments = {
    'common': {
        path: 'common',
        async: false,
        address: 'http://localhost:4000'
    },
    // 'header': {
    //     path: 'header',
    //     async: true,
    //     address: 'http://localhost:4000'
    // },
    'body': {
        path: 'body',
        async: true,
        address: 'http://localhost:4000'
    }
}
const app = express();
const tailorInstance = new Tailor({
    maxAssetLinks: 20,
    handledTags: ['script'],
    handleTag(request, tag, options, context) {
        return `
        <script>
            if (global === undefined) {
                var global = window;
            }
        </script>
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then((reg) => {
                            console.log('Service Worker registered.', reg)
                        })
                })
            }
        </script>
        <script>
            (function (d) {
                require(d);
                var arr = ['react', 'react-dom', 'prop-types', 'classnames', 'proppy', 'proppy-react'];
                while (i = arr.pop())(function (dep) {
                    define(dep, d, function (b) {
                        return b[dep];
                    })
                })(i);
                }(['${context['common'].src}/bundleCommon.js']));
        </script>`
    },
    filterRequestHeaders(attributes, request) {
        return {
            ...filterReqHeadersFn(attributes, request),
            'Custom-header': 12312312312
        }
    },
    fetchContext(req) {
        const urls = Object.values(fragments)
            .map(({
                port,
                path,
                address
            }) => `${address}/${path}`)

        const fragmentsMapped = Object.keys(fragments)
            .reduce((prev, curr, index) => {
                return ({
                    ...prev,
                    [curr]: {
                        src: urls[index],
                        async: fragments[curr].async
                    }
                })
            }, {})
        return Promise.resolve(
            fragmentsMapped
        )
    }
})

const PORT = process.env.PORT || 9000;

app.use(express.static(__dirname + '/public'))
app.get('/health', (req, res) => {
    res.status(200).send({
        status: 'ok'
    })
})
app.use('/sw.js', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    next();
})

app.use('/precache-manifest.a7bcc119d690cb85619d6f2f4a9cbc89.js', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    next();
})
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