import booksActionTypes from '../actions/books.action';

export const BOOKS_INITIAL_STATE = [];
export const SINGLE_BOOK_INITIAL_STATE = ('')

const booksReducer = (state, action) => {
	switch (action.type) {
		case booksActionTypes.INIT_BOOKS: {
			const books = action.payload.books;
			return books;
		}

		case booksActionTypes.INIT_SINGLE_BOOK: {
			const book = action.payload.book;
			return book
		}

		default:
			return state;
	}
};

export default booksReducer;
