import Book from '../models/book.model.js';

export const createBook = async (req, res) => {
	const data = req.body;
	try {
		const book = new Book(data);
		await book.save();

		res.status(201).send({
			status: 201,
			statusText: 'Created',
			data: {
				book: book.title,
			},
			message: 'Book was created successfully!',
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: 400,
			statusText: 'Bed request',
			message: 'Book was not created!',
		});
	}
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
		res.status(200).send({
			status: 200,
			statusText: 'Ok',
			data: {
				books: books,
			},
		});
	} catch (err) {
        console.log(err)
		res.status(500).send({
			status: 500,
			statusText: 'Internal Server Error',
			message: '',
		});
	}
};

export const getBookById = async (req, res) => {
    const bookID = req.params.bookID
    try {
        const book = await Book.findById(bookID)
        console.log(book)

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: book,
        })

    } catch (err) {
        console.log(err);
				res.status(500).send({
					status: 500,
					statusText: 'Internal Server Error',
					message: '',
				}); 
    }
}
