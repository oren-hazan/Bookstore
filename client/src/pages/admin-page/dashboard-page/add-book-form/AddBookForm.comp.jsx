import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import './add-book-form.styles.css';
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
} from '../../../../actions/book-form.actions';
import environment from '../../../../environments/environments';

const AddBookForm = (props) => {
	const API_URL = environment.API_URL;
	const adminToken = localStorage.getItem('admin-token');
	const navigate = useNavigate();

	const [bookFormState, dispatchBookFormState] = useReducer(
		bookFormReducer,
		BOOK_FORM_INITIAL_STATE
	);

	const handleTitleInput = (event) => {
		const textInput = event.target.value.trim();

		if (textInput.length < 2) {
			dispatchBookFormState(
				updateTitleAction(
					textInput,
					false,
					'*Valid Title must contain at least 2 characters'
				)
			);
			return;
		}
		dispatchBookFormState(updateTitleAction(textInput, true, ''));
	};

	const handleAuthorInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput.length < 2) {
			dispatchBookFormState(
				updateAuthorAction(
					textInput,
					false,
					'*Valid Author must contain at least 2 characters'
				)
			);
			return;
		}
		dispatchBookFormState(updateAuthorAction(textInput, true, ''));
	};

	const handleDescriptionInput = (event) => {
		const textInput = event.target.value.trim();
		if (
			typeof textInput !== 'string' ||
			textInput.length < 2 ||
			textInput[0].toUpperCase() !== textInput[0]
		) {
			dispatchBookFormState(
				updateDescriptionAction(
					textInput,
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
		if (!validator.isURL(textInput)) {
			dispatchBookFormState(
				updateBookCoveredAction(textInput, false, '*Not a valid URL')
			);
			return;
		}
		dispatchBookFormState(updateBookCoveredAction(textInput, true, ''));
	};

	const handlePagesInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput < 1) {
			dispatchBookFormState(
				updatePagesAction(textInput, false, '*You must add pages!')
			);
			return;
		}
		dispatchBookFormState(updatePagesAction(textInput, true, ''));
	};

	const handlePriceInput = (event) => {
		const textInput = event.target.value.trim();
		if (textInput < 1) {
			dispatchBookFormState(
				updatePriceAction(textInput, false, '*You must add price!')
			);
			return;
		}
		dispatchBookFormState(updatePriceAction(textInput, true, ''));
	};

	const handleNewBookSubmit = async (event) => {
		event.preventDefault();

		const validities = bookFormState.validities;
		const values = bookFormState.values;

		if (
			validities.title &&
			validities.author &&
			validities.description &&
			validities.bookCovered &&
			validities.pages &&
			validities.price
		) {
			const data = {
				title: values.title,
				author: values.author,
				description: values.description,
				bookCovered: values.bookCovered,
				pages: values.pages,
				price: values.price,
			};

			try {
				const response = await fetch(`${API_URL}/books/new`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + adminToken,
					},
					body: JSON.stringify(data),
				});

				if (response.status !== 201) throw new Error();

				alert('New book was saved successfully!');
				navigate('/admin');
			} catch (err) {
				alert('Something went wrong!');
			}
			return;
		} else {
			alert('The new book form is not valid!');
		}
	}

	const resetValuesAndErrors = () => {
		dispatchBookFormState(updateTitleAction('', false, ''));
		dispatchBookFormState(updateAuthorAction('', false, ''));
		dispatchBookFormState(updateDescriptionAction('', false, ''));
		dispatchBookFormState(updateBookCoveredAction('', false, ''));
		dispatchBookFormState(updatePagesAction('', false, ''));
		dispatchBookFormState(updatePriceAction('', false, ''));
		document.getElementById('reset-form').reset();
	};

	const handleCloseButton = () => {
		props.closeModal();
		resetValuesAndErrors();
	};

	return (
		<div className={`formModal ${props.className}`}>
			<form
				id='reset-form'
				className='add-book-form'
				onSubmit={handleNewBookSubmit}>
				<h3 className='form-title'>
					Hello Admin, fill in the book details and press{' '}
					<button class='save-form-btn' type='submit'>
						Save
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
								id='title'
								name='title'
								isValid={bookFormState.validities.title}
								errorMessage={bookFormState.errorMessages.title}
								required={true}
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
								id='author'
								name='author'
								isValid={bookFormState.validities.author}
								errorMessage={bookFormState.errorMessages.author}
								required={true}
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
								!bookFormState.validities.description
									? 'error-form-input big-input'
									: 'form-input big-input'
							}
							type='text'
							id='description'
							name='description'
							isValid={bookFormState.validities.description}
							errorMessage={bookFormState.errorMessages.description}
							required={true}
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
							id='bookCovered'
							name='bookCovered'
							isValid={bookFormState.validities.bookCovered}
							errorMessage={bookFormState.errorMessages.bookCovered}
							required={true}
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
								id='pages'
								name='pages'
								isValid={bookFormState.validities.pages}
								errorMessage={bookFormState.errorMessages.pages}
								required={true}
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
								id='price'
								name='price'
								isValid={bookFormState.validities.price}
								errorMessage={bookFormState.errorMessages.price}
								required={true}
								min='1'
							/>
						</div>
					</div>
					<div>
						<button class='save-form-btn' type='submit'>
							Save
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

export default AddBookForm;
