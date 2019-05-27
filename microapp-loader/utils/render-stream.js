module.exports = (ContainerApp) => {
    
    const component = ContainerApp.serverSideApplication().application;

    return component;
};
