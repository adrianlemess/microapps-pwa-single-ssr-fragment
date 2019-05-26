const ContainerApp = require('../dists/header/server.1da8395614e23d61fb09');

module.exports = () => {
    const component = ContainerApp.serverSideApplication().application;

    return component;
};
