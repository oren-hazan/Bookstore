const booksActionTypes = {
	INIT_BOOKS: 'INIT_BOOKS',
	INIT_SINGLE_BOOK: 'INIT_SINGLE_BOOK',
};

export const initBooksAction = (books) => {
	const action = {
		type: booksActionTypes.INIT_BOOKS,
		payload: {
			books: books,
		},
	};
	return action;
};

export const initSingleBookAction = (book) => {
	const action = {
		type: booksActionTypes.INIT_SINGLE_BOOK,
		payload: { book: book },
	};
    return action
};

export default booksActionTypes;
