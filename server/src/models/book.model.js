import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
		trim: true,
	},
	bookCovered: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	pages: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
});

bookSchema.methods.toJSON = function () {
	const book = this;
	const bookObj = book.toObject();
	delete bookObj.__v;

	return bookObj;
};

const Book = mongoose.model('Book', bookSchema);

export default Book;
