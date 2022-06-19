import User from '../models/user.model.js';

export const createUser = async (req, res) => {
	const userData = req.body;
	const user = new User(userData);

	
	try {
		const cart = await user.createCart();
		const token = await user.generateAuthToken();

		await user.save();

		res.status(201).send({
			status: 201,
			statusText: 'Created',
			data: {
				user: user,
				token: token,
				cart: cart,
			},
			message: 'User was created successfully!',
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: 400,
			statusText: 'Bad request',
			massage: 'User was not created!',
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
		const user = await User.findUserByEmailAndPassword(email, password);
		const token = await user.generateAuthToken();

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {
				user: user,
				token: token,
			},
			message: 'User was login successfully!',
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
	const user = req.user;
	const token = req.token;

	try {
		user.tokens = user.tokens.filter((tokenDoc) => tokenDoc.token !== token);
		await user.save();

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {},
			message: 'User logout was successfully!',
		});
	} catch {
		console.log(err);
		res.status(400).send({
			status: 400,
			statusText: 'Bad request',
			massage: 'Error to logout!',
		});
	}
};

export const updateUser = async (req, res) => {
	const userID = req.params.userID;
	const data = req.body;
	try {
		await User.findByIdAndUpdate(userID, data);
		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {},
			message: 'User was updated successfully!',
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

export const deleteUser = async (req, res) => {
	const userID = req.params.userID;

	try {
		await User.findByIdAndDelete(userID);

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {},
			message: 'User was deleted successfully!',
		});
	} catch {
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};
