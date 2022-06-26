import Cart from '../models/cart.model.js';
import Book from '../models/book.model.js';

export const showCart = async (req, res) => {
	const user = req.user;

	try {
		const userData = await user.populate({
			path: 'myCart',
			populate: { path: 'books.bookID' },
		});

		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {
				cart: userData.myCart[0].books,
			},
			message: '',
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};

export const addToCart = async (req, res) => {
	const user = req.user._id;
	const bookID = req.body.bookID;

	try {
		const bookData = await Book.findById(bookID);
		await Cart.findOneAndUpdate(user, {
			$push: { books: { bookID: bookData } },
		});

		const updateCart = await Cart.findOne(user).populate('books.bookID');

		res.status(202).send({
			status: 202,
			statusText: 'Accepted',
			data: {
				cart: updateCart,
			},
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};

export const deleteFromCart = async (req, res) => {
	const user = req.user._id;
	const book = req.body;
	try {
		await Cart.findOneAndUpdate(user, {
			$pull: { books: { bookID: book } },
		});

		const updateCart = await Cart.findOne(user).populate('books.bookID');

		res.status(200).send({
			status: 200,
			statusText: 'OK',
			data: updateCart,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};

export const checkOut = async (req, res) => {
	const user = req.user._id;
	try {
		await Cart.findOneAndUpdate(user, { books: [] });

		const updateCart = await Cart.findOne(user);

		res.status(202).send({
			status: 202,
			statusText: 'Accepted',
			data: updateCart,
		});
	} catch (err) {
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};
