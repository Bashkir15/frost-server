import helmet from 'helmet';
import parameterProtection from 'hpp';
import uuid from 'uuid';

export default (server, { enableNonce = true }) => {
	if (enableNonce) {
		server.use((req, res, next) => {
			res.locals.nonce = uuid();
			next();
		});
	}

	server.disable('x-powered-by');
	server.use(parameterProtection());
	server.use(helmet.xssFilter());
	server.use(helmet.frameguard('deny'));
	server.use(helmet.ieNoOpen());
	server.use(helmet.noSniff());
}