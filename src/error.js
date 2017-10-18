import PrettyError from 'pretty-error';

const pretty = new PrettyError();

// This will skip events.js, http, and similar core node components
pretty.skipNodeFiles();
// This will skip all the trace lines about express' core
pretty.skipPackage('express');


export default server => {
	server.use((error, req, res, next) => {
		console.log(pretty.render(error));
		next();
	});
};
