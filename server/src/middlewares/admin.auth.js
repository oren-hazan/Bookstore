import jwt from 'jsonwebtoken';
import environments from '../../config/environments.js';

import Admin from '../models/admin.model.js';

const adminAuth = async (req, res, next) => {
	try {
		const authorization = req.header('Authorization');
		if (!authorization) {
			throw new Error();
		}

		const token = authorization.replace('Bearer ', '');
		if (!token) {
			throw new Error();
		}

		const data = jwt.verify(token, environments.TOKEN_SECRET);
		const admin = await Admin.findOne({
			_id: data._id,
			'tokens.token': token,
		});
		if (!admin) {
			throw new Error();
		}

		req.admin = admin;
		req.token = token;

		next();
	} catch (err) {
		res.status(401).send({
			status: 401,
			statusText: 'Unauthorized',
			message: 'The user was not authorized',
		});
	}
};

export default adminAuth;
