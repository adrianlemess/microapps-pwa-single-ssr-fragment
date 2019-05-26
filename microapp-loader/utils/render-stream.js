module.exports = (ContainerApp) => {
    console.log('container', ContainerApp)
    
    const component = ContainerApp.serverSideApplication().application;

    return component;
};
