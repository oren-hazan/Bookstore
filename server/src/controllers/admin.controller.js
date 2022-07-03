import Admin from '../models/admin.model.js';

export const createAdmin = async (req, res) => {
	const adminData = req.body;
	const admin = new Admin(adminData);

	try {
		const token = await admin.generateAuthToken();
		await admin.save(token);

		res.status(201).send({
			status: 201,
			statusText: 'Created',
			data: {
				admin: admin,
				token: token,
			},
			message: 'Admin was created successfully!',
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: 400,
			statusText: 'Bad request',
			massage: 'Admin was not created!',
		});
	}
};

export const login = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		if (!email || !password) {
			throw new Error('Error to login!');
		}
		const admin = await Admin.findAdminByEmailAndPassword(email, password);
		const token = await admin.generateAuthToken();

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {
				admin: admin,
				token: token,
			},
			message: 'Admin was login successfully!',
		});
	} catch (err) {
		console.log(err.massage);
		res.status(400).send({
			status: 400,
			statusText: 'Bad request',
			massage: 'Error to login!',
		});
	}
};

export const logout = async (req, res) => {
	const admin = req.admin;
	const token = req.token;

	try {
		admin.tokens = admin.tokens.filter((tokenDoc) => tokenDoc.token !== token);
		await admin.save();

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {},
			message: 'Admin logout was successfully!',
		});
	} catch {
		console.log(err.massage);
		res.status(500).send({
			status: 500,
			statusText: 'Internal server error!',
			massage: 'Error to logout!',
		});
	}
};

export const updateAdmin = async (req, res) => {
	const adminID = req.params.adminID;
	const data = req.body;
	try {
		await Admin.findByIdAndUpdate(adminID, data);
		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {},
			message: 'Admin was updated successfully!',
		});
	} catch (err) {
		console.log(err.massage);
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};

export const deleteAdmin = async (req, res) => {
	const adminID = req.params.adminID;

	try {
		await Admin.findByIdAndDelete(adminID);

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {},
			message: 'Admin was deleted successfully!',
		});
	} catch {
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};
