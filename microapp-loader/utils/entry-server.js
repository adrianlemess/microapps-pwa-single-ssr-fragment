const React = require('react')
const reactServer = require('react-dom/server');
const ContainerApp = require('../dists/header/server.1f2d48834751bf032c0f');
const toHtml = require('./html');

module.exports = () => {
    const component = ContainerApp.serverSideApplication().application;
    const html = reactServer.renderToString(component)
    console.log(html)
    return html;
};
