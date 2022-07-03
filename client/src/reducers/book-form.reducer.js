/* eslint-disable default-case */
import bookFormActionTypes from '../actions/book-form.actions';

export const BOOK_FORM_INITIAL_STATE = {
	values: {
		title: '',
		author: '',
		description: '',
		bookCovered: '',
		pages: '',
		price: '',
	},

	validities: {
		title: false,
		author: false,
		description: false,
		bookCovered: false,
		pages: false,
		price: false,
	},

	errorMessages: {
		title: '',
		author: '',
		description: '',
		bookCovered: '',
		pages: '',
		price: '',
	},
};

const addBookFormReducer = (state, action) => {
	switch (action.type) {
		case bookFormActionTypes.UPDATE_TITLE: {
			const updateTitleValue = action.payload.value;
			const updateIsTitleValid = action.payload.isValid;
			const updateTitleErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, title: updateTitleValue };
			const updateValidities = {
				...state.validities,
				title: updateIsTitleValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				title: updateTitleErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case bookFormActionTypes.UPDATE_AUTHOR: {
			const updateAuthorValue = action.payload.value;
			const updateIsAuthorValid = action.payload.isValid;
			const updateAuthorErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, author: updateAuthorValue };
			const updateValidities = {
				...state.validities,
				author: updateIsAuthorValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				author: updateAuthorErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case bookFormActionTypes.UPDATE_DESCRIPTION: {
			const updateDescriptionValue = action.payload.value;
			const updateIsDescriptionValid = action.payload.isValid;
			const updateDescriptionErrorMessage = action.payload.errorMessage;

			const updateValues = {
				...state.values,
				description: updateDescriptionValue,
			};
			const updateValidities = {
				...state.validities,
				description: updateIsDescriptionValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				description: updateDescriptionErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case bookFormActionTypes.UPDATE_BOOK_COVERED: {
			const updateBookCoveredValue = action.payload.value;
			const updateIsBookCoveredValid = action.payload.isValid;
			const updateBookCoveredErrorMessage = action.payload.errorMessage;

			const updateValues = {
				...state.values,
				bookCovered: updateBookCoveredValue,
			};
			const updateValidities = {
				...state.validities,
				bookCovered: updateIsBookCoveredValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				bookCovered: updateBookCoveredErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case bookFormActionTypes.UPDATE_PAGES: {
			const updatePagesValue = action.payload.value;
			const updateIsPagesValid = action.payload.isValid;
			const updatePagesErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, pages: updatePagesValue };
			const updateValidities = {
				...state.validities,
				pages: updateIsPagesValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				pages: updatePagesErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case bookFormActionTypes.UPDATE_PRICE: {
			const updatePriceValue = action.payload.value;
			const updateIsPriceValid = action.payload.isValid;
			const updatePriceErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, price: updatePriceValue };
			const updateValidities = {
				...state.validities,
				price: updateIsPriceValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				price: updatePriceErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		// case bookFormActionTypes.UPDATE_BOOK: {
		// 	const index = action.payload.index;
		// 	const updateTitle = action.payload.title;
		// 	const updateAuthor = action.payload.author;
		// 	const updateDescription = action.payload.description;
		// 	const updateBookCovered = action.payload.bookCovered;
		// 	const updatePages = action.payload.pages;
		// 	const updatePrice = action.payload.price;


		// 	const updateState = [...state];
		// 	updateState[index].title = updateTitle;
		// 	updateState[index].author = updateAuthor;
		// 	updateState[index].description = updateDescription;
		// 	updateState[index].bookCovered = updateBookCovered;
		// 	updateState[index].pages = updatePages;
		// 	updateState[index].price = updatePrice;

		// 	return updateState;
		// }

		case bookFormActionTypes.DELETE_BOOK: {
			const bookID = action.payload.bookID;
			const updateState = state.filter((book) => book._id !== bookID);
			return updateState;
		}
	}
	return state;
};

export default addBookFormReducer;
