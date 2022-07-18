import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './update-book-form.styles.css';
import CustomInput from '../../../../components/shared/custom-input/CustomInput.comp';
import bookFormReducer, {
	BOOK_FORM_INITIAL_STATE,
} from '../../../../reducers/book-form.reducer';
import {
	updateTitleAction,
	updateAuthorAction,
	updateDescriptionAction,
	updateBookCoveredAction,
	updatePagesAction,
	updatePriceAction,
	updateBookAction,
	deleteBookAction,
} from '../../../../actions/book-form.actions';
import { updateBook, deleteBook } from '../../../../services/book.service';

const UpdateBookForm = (props) => {
	const navigate = useNavigate();
	const adminToken = localStorage.getItem('admin-token');
	const [bookFormState, dispatchBookFormState] = useReducer(
		bookFormReducer,
		BOOK_FORM_INITIAL_STATE
	);

	const book = props.bookState;
	const bookID = props.bookID;

	const handleTitleInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput.length === 1) {
			dispatchBookFormState(
				updateTitleAction(
					'',
					false,
					'*Valid Title must contain at least 2 characters'
				)
			);
			return;
		}
		dispatchBookFormState(updateTitleAction(textInput, true, ''));
		if (textInput.length <= 1) {
			dispatchBookFormState(updateTitleAction('', true, ''));
		}
	};

	const handleAuthorInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput.length === 1) {
			dispatchBookFormState(
				updateAuthorAction(
					'',
					false,
					'*Valid Author must contain at least 2 characters'
				)
			);
			return;
		}
		dispatchBookFormState(updateAuthorAction(textInput, true, ''));
		if (textInput.length <= 1) {
			dispatchBookFormState(updateAuthorAction('', true, ''));
		}
	};

	const handleDescriptionInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput.length === 0) {
			dispatchBookFormState(updateDescriptionAction('', true, ''));
			return;
		}
		if (
			typeof textInput !== 'string' ||
			textInput.length === 1 ||
			textInput[0].toUpperCase() !== textInput[0]
		) {
			dispatchBookFormState(
				updateDescriptionAction(
					'',
					false,
					'*Valid Description must contain at least 2 characters and starts with capital letter'
				)
			);
			return;
		}
		dispatchBookFormState(updateDescriptionAction(textInput, true, ''));
	};

	const handleBookCoveredInput = (event) => {
		const textInput = event.target.value.trim();
		function isImage(url) {
			return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
		}
		if (!isImage(textInput) && textInput.length > 0) {
			dispatchBookFormState(
				updateBookCoveredAction('', false, '*Not a valid URL')
			);
			return;
		}
		dispatchBookFormState(updateBookCoveredAction(textInput, true, ''));
		if (textInput === '') {
			dispatchBookFormState(updateBookCoveredAction(undefined, true, ''));
		}
	};

	const handlePagesInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput < 1 && textInput.length !== 0) {
			dispatchBookFormState(
				updatePagesAction(textInput, false, '*You must add pages!')
			);
			return;
		}
		dispatchBookFormState(updatePagesAction(textInput, true, ''));
		if (textInput === '') {
			dispatchBookFormState(updatePagesAction('', true, ''));
		}
	};

	const handlePriceInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput < 1 && textInput.length !== 0) {
			dispatchBookFormState(
				updatePriceAction(textInput, false, '*You must add price!')
			);
			return;
		}
		dispatchBookFormState(updatePriceAction(textInput, true, ''));
		if (textInput === '') {
			dispatchBookFormState(updatePriceAction('', true, ''));
		}
	};

	const handleUpdateSubmit = async (event) => {
		event.preventDefault();
		const valid = bookFormState.validities;
		const value = bookFormState.values;
		if (
			value.title === '' &&
			value.author === '' &&
			value.description === '' &&
			value.bookCovered === '' &&
			value.pages === '' &&
			value.price === ''
		) {
			alert('You must fill in at least one field!');
			return;
		}
		if (
			(valid.title || value.title === '') &&
			(valid.author || value.author === '') &&
			(valid.description || value.description === '') &&
			(valid.bookCovered || value.bookCovered === '') &&
			(valid.pages || value.pages === '') &&
			(valid.price || value.price === '')
		) {
			const data = {
				title: value.title ? value.title : undefined,
				author: value.author ? value.author : undefined,
				description: value.description ? value.description : undefined,
				bookCovered: value.bookCovered ? value.bookCovered : undefined,
				pages: value.pages ? value.pages : undefined,
				price: value.price ? value.price : undefined,
			};
			try {
				await updateBook(adminToken, bookID, data);

				navigate('/admin');
				alert('Book was updated successfully!');
			} catch (err) {
				alert('Something went wrong!');
			}
		} else {
			alert('Some of the fields are not filled in properly!');
		}
	};

	const handleDeleteBook = async () => {
		try {
			
			await deleteBook(adminToken, bookID)

			navigate('/admin');
			alert('Book was deleted successfully!');
		} catch (err) {
			alert('Something went wrong!');
		}
	};

	const resetValuesAndErrors = () => {
		dispatchBookFormState(updateTitleAction('', false, ''));
		dispatchBookFormState(updateAuthorAction('', false, ''));
		dispatchBookFormState(updateDescriptionAction('', false, ''));
		dispatchBookFormState(updateBookCoveredAction('', false, ''));
		dispatchBookFormState(updatePagesAction('', false, ''));
		dispatchBookFormState(updatePriceAction('', false, ''));
		document.getElementById('update-book-form').reset();
	};

	const handleCloseButton = () => {
		props.closeModal();
		resetValuesAndErrors();
	};

	return (
		<div className={`update-formModal ${props.className}`}>
			<form
				id='update-book-form'
				className='add-book-form'
				onSubmit={handleUpdateSubmit}>
				<h3 className='form-title'>
					Hello Admin, fill in the book details and press
					<button class='update-form-btn' type='submit' disabled={true}>
						Update
					</button>
					button to Submit
				</h3>
				<div className='add-book-form-container'>
					<div className='flex-row'>
						<div>
							<label className='add-book-label' htmlFor='title'>
								Title
							</label>
							<CustomInput
								onInput={handleTitleInput}
								inputClassName={
									!bookFormState.validities.title
										? 'error-form-input'
										: 'form-input'
								}
								type='text'
								placeholder={book.title}
								id='title'
								name='title'
								isValid={bookFormState.validities.title}
								errorMessage={bookFormState.errorMessages.title}
								required={false}
							/>
						</div>
						<div>
							<label className='add-book-label' htmlFor='author'>
								Author
							</label>
							<CustomInput
								onInput={handleAuthorInput}
								inputClassName={
									!bookFormState.validities.author
										? 'error-form-input'
										: 'form-input'
								}
								type='text'
								placeholder={book.author}
								id='author'
								name='author'
								isValid={bookFormState.validities.author}
								errorMessage={bookFormState.errorMessages.author}
								required={false}
							/>
						</div>
					</div>

					<div>
						<label className='add-book-label' htmlFor='description'>
							Description
						</label>
						<CustomInput
							onInput={handleDescriptionInput}
							inputClassName={
								bookFormState.validities.description
									? 'error-form-input big-input'
									: 'form-input big-input'
							}
							type='text'
							placeholder={book.description}
							id='description'
							name='description'
							isValid={bookFormState.validities.description}
							errorMessage={bookFormState.errorMessages.description}
							required={false}
						/>
					</div>

					<div>
						<label className='add-book-label' htmlFor='bookCovered'>
							Book Covered
						</label>
						<CustomInput
							onInput={handleBookCoveredInput}
							inputClassName={
								!bookFormState.validities.bookCovered
									? 'error-form-input big-input'
									: 'form-input big-input'
							}
							type='text'
							placeholder={book.bookCovered}
							id='bookCovered'
							name='bookCovered'
							isValid={bookFormState.validities.bookCovered}
							errorMessage={bookFormState.errorMessages.bookCovered}
							required={false}
						/>
					</div>
					<div className='flex-row'>
						<div>
							<label className='add-book-label' htmlFor='pages'>
								Pages
							</label>
							<CustomInput
								onInput={handlePagesInput}
								inputClassName={
									!bookFormState.validities.pages
										? 'error-form-input'
										: 'form-input'
								}
								type='number'
								placeholder={book.pages}
								id='pages'
								name='pages'
								isValid={bookFormState.validities.pages}
								errorMessage={bookFormState.errorMessages.pages}
								required={false}
								min='1'
							/>
						</div>
						<div>
							<label className='add-book-label' htmlFor='price'>
								Price
							</label>
							<CustomInput
								onInput={handlePriceInput}
								inputClassName={
									!bookFormState.validities.price
										? 'error-form-input'
										: 'form-input'
								}
								type='number'
								placeholder={book.price}
								id='price'
								name='price'
								isValid={bookFormState.validities.price}
								errorMessage={bookFormState.errorMessages.price}
								required={false}
								min='1'
							/>
						</div>
					</div>
					<div className='btn-container'>
						<button class='update-form-btn' type='submit'>
							Update
						</button>
						<button
							class='delete-form-btn'
							type='button'
							onClick={handleDeleteBook}>
							Delete
						</button>
						<button
							class='close-form-btn'
							type='button'
							onClick={handleCloseButton}>
							Close
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateBookForm;
