import helmet from 'helmet';
import parameterProtection from 'hpp';
import uuid from 'uuid';

export default (server, { enableNonce = true, enableCSP = true }) => {
	if (enableNonce) {
		server.use((req, res, next) => {
			res.locals.nonce = uuid();
			next();
		});
	}

	const cspConfig = enableCSP ? {
		directives: {
			defaultSrc: [ '"self"' ],
			scriptSrc: [
				"'self'",
				(req, res) => `nonce-${res.locals.nonce}`,
				process.env.NODE_ENV === 'development'
					? '"unsafe-eval"'
					: ''
			].filter(value => value !== '')m
			styleSrc: [ '"self"', '"unsafe-inline"', 'blob:' ],
			imgSrc: [ '"self"', 'data:' ],
			fontSrc: [ '"self"', 'data:' ],
			connectSrc: [ '"self"', 'ws:' ],
			childSrc: [ '"self"' ]
		}
	} : null;

	if (enableCSP) {
		server.use(helmet.contentSecurityPolicy(cspConfig));
	}
	
	server.disable('x-powered-by');
	server.use(parameterProtection());
	server.use(helmet.xssFilter());
	server.use(helmet.frameguard('deny'));
	server.use(helmet.ieNoOpen());
	server.use(helmet.noSniff());
}