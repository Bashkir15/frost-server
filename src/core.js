import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default server => {
	server.use(cookieParser());
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
};
