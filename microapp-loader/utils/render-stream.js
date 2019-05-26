const { renderToNodeStream } = require('react-dom/server');

const entryServer = require('./entry-server.js');


module.exports = () => {
	const markup = entryServer();
	return renderToNodeStream(markup);
};
