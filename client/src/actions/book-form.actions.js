const bookFormActionTypes = {
	UPDATE_TITLE: 'UPDATE_TITLE',
	UPDATE_AUTHOR: 'UPDATE_AUTHOR',
    UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
	UPDATE_BOOK_COVERED: 'UPDATE_BOOK_COVERED',
	UPDATE_PAGES: 'UPDATE_PAGES',
	UPDATE_PRICE: 'UPDATE_PRICE',
	UPDATE_BOOK: 'UPDATE_BOOK',
	DELETE_BOOK: 'DELETE_BOOK'
};

export const updateTitleAction = (value, isValid, errorMessage) => {
	const action = {
		type: bookFormActionTypes.UPDATE_TITLE,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updateAuthorAction = (value, isValid, errorMessage) => {
	const action = {
		type: bookFormActionTypes.UPDATE_AUTHOR,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updateDescriptionAction = (value, isValid, errorMessage) => {
	const action = {
		type: bookFormActionTypes.UPDATE_DESCRIPTION,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updateBookCoveredAction = (value, isValid, errorMessage) => {
	const action = {
		type: bookFormActionTypes.UPDATE_BOOK_COVERED,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updatePagesAction = (value, isValid, errorMessage) => {
	const action = {
		type: bookFormActionTypes.UPDATE_PAGES,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updatePriceAction = (value, isValid, errorMessage) => {
	const action = {
		type: bookFormActionTypes.UPDATE_PRICE,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

// export const updateBookAction = (index, title, author, description, bookCovered, pages, price) => {
// 	const action = {
// 		type: bookFormActionTypes.UPDATE_BOOK,
// 		payload: {
// 			index: index,
// 			title: title,
// 			author: author,
// 			description: description,
// 			bookCovered: bookCovered,
// 			pages: pages,
// 			price: price
// 		}
// 	}
// 	return action
// }

export const deleteBookAction = (bookID) => {
	const action = {
		type: bookFormActionTypes.DELETE_BOOK,
		payload: {
			bookID: bookID,
		},
	};
	return action;
};

export default bookFormActionTypes;
