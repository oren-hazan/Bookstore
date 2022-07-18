import React, { useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import signupReducer, {
	SIGNUP_FORM_INITIAL_STATE,
} from '../../../reducers/signup-form.reducer';
import {
	updateFirstNameAction,
	updateLastNameAction,
	updateEmailAction,
	updatePasswordAction,
	updateRepeatedPasswordAction,
} from '../../../actions/signup-form.actions';
import { AuthContext } from '../../../contexts/Auth.context';
import { userSignup } from '../../../services/user.service'
import CustomInput from '../../../components/shared/custom-input/CustomInput.comp';
import './signup-form.styles.css';

const SignupForm = () => {
	const navigate = useNavigate();

	const { setUserToken} = useContext(AuthContext);

	const [signupFormState, dispatchSignupFormState] = useReducer(
		signupReducer,
		SIGNUP_FORM_INITIAL_STATE
	);

	const handleFirstNameInput = (event) => {
		const textInput = event.target.value.toLowerCase().trim();
		if (textInput === '') {
			dispatchSignupFormState(
				updateFirstNameAction(textInput, false, '*Please enter your first name')
			);
			return;
		}
		dispatchSignupFormState(updateFirstNameAction(textInput, true, ''));
		return;
	};

	const handleLastNameInput = (event) => {
		const textInput = event.target.value.toLowerCase().trim();
		if (textInput === '') {
			dispatchSignupFormState(
				updateLastNameAction(textInput, false, '*Please enter your last name')
			);
			return;
		}
		dispatchSignupFormState(updateLastNameAction(textInput, true, ''));
		return;
	};

	const handleEmailInput = (event) => {
		const textInput = event.target.value.toLowerCase().trim();

		if (textInput === '') {
			dispatchSignupFormState(
				updateEmailAction(textInput, false, '*Example - email@email.com')
			);
			return;
		}

		if (!isEmail(textInput)) {
			dispatchSignupFormState(
				updateEmailAction(
					textInput,
					false,
					'*Please enter a valid email address'
				)
			);
			return;
		}
		dispatchSignupFormState(updateEmailAction(textInput, true, ''));
	};

	const handlePasswordInput = (event) => {
		const textInput = event.target.value.trim();

		if (textInput === '') {
			dispatchSignupFormState(
				updatePasswordAction(textInput, false, '*Example - password1234')
			);
			return;
		}

		const numbers = /[0-9]/g;

		if (
			textInput.length > 20 ||
			textInput.length < 8 ||
			!textInput.match(numbers)
		) {
			dispatchSignupFormState(
				updatePasswordAction(
					textInput,
					false,
					'*You must enter a password with the length of 8-20 characters and must contain at least 1 number'
				)
			);
			return;
		} else {
			dispatchSignupFormState(updatePasswordAction(textInput, true, ''));
			handleRepeatedPassword(event);
		}
	};

	const handleRepeatedPassword = (event) => {
		const passwordTextInput = signupFormState.values.password;
		const textInput = event.target.value.trim();

		if (textInput === '') {
			dispatchSignupFormState(
				updateRepeatedPasswordAction(
					textInput,
					false,
					'*Please enter your password again'
				)
			);
			return;
		}

		if (passwordTextInput === textInput) {
			dispatchSignupFormState(
				updateRepeatedPasswordAction(textInput, true, '')
			);
			return;
		} else {
			dispatchSignupFormState(
				updateRepeatedPasswordAction(textInput, false, '')
			);
			return;
		}
	};

	const handleSignupSubmit = async (event) => {
		event.preventDefault();
		const validities = signupFormState.validities;
		const values = signupFormState.values;
		if (
			validities.firstName &&
			validities.lastName &&
			validities.email &&
			validities.password &&
			validities.repeatedPassword
		) {
			const data = {
				firstName: signupFormState.values.firstName,
				lastName: signupFormState.values.lastName,
				email: signupFormState.values.email,
				password: signupFormState.values.password,
			};

			try {
				const responseData = await userSignup(data)
				const token = responseData.data.token;
				localStorage.setItem('token', token);
				setUserToken(token);
				navigate('/');
			} catch (err) {
				alert('Something went wrong!');
			}
			return;
		} else {
			console.log('Signup form is not valid!');
		}
		if (!validities.repeatedPassword) {
			dispatchSignupFormState(
				updateRepeatedPasswordAction(
					values.repeatedPassword,
					false,
					'*Your password is not match, please try again'
				)
			);
			return;
		}
		dispatchSignupFormState(
			updateRepeatedPasswordAction(values.repeatedPassword, false, '')
		);
		return;
	};

	return (
		<div>
			<form className='signup-card' onSubmit={handleSignupSubmit}>
				<h1>Hello New User!</h1>
				<div>
					<label htmlFor='first-name'></label>
					<CustomInput
						onInput={handleFirstNameInput}
						inputClassName={
							!signupFormState.validities.firstName
								? 'error-form-input'
								: 'form-input'
						}
						type='text'
						id='first-name'
						placeholder='First Name:'
						name='first-name'
						required={true}
						isValid={signupFormState.validities.firstName}
						errorMessage={signupFormState.errorMessages.firstName}
					/>
				</div>
				<div>
					<label htmlFor='last-name'></label>
					<CustomInput
						onInput={handleLastNameInput}
						inputClassName={
							!signupFormState.validities.lastName
								? 'error-form-input'
								: 'form-input'
						}
						type='text'
						id='last-name'
						placeholder='Last Name:'
						name='last-name'
						required={true}
						isValid={signupFormState.validities.lastName}
						errorMessage={signupFormState.errorMessages.lastName}
					/>
				</div>
				<div>
					<label htmlFor='email'></label>
					<CustomInput
						onInput={handleEmailInput}
						inputClassName={
							!signupFormState.validities.email
								? 'error-form-input'
								: 'form-input'
						}
						type='text'
						id='email'
						placeholder='Email:'
						name='email'
						required={true}
						isValid={signupFormState.validities.email}
						errorMessage={signupFormState.errorMessages.email}
					/>
				</div>
				<div>
					<label htmlFor='password'></label>
					<CustomInput
						onInput={handlePasswordInput}
						inputClassName={
							!signupFormState.validities.password
								? 'error-form-input'
								: 'form-input'
						}
						type='password'
						id='password'
						placeholder='Password:'
						name='password'
						required={true}
						isValid={signupFormState.validities.password}
						errorMessage={signupFormState.errorMessages.password}
					/>
				</div>
				<div>
					<label htmlFor='password2'></label>
					<CustomInput
						onInput={handleRepeatedPassword}
						inputClassName={
							!signupFormState.validities.repeatedPassword
								? 'error-form-input'
								: 'form-input'
						}
						type='password'
						id='password2'
						placeholder='Repeated Password:'
						name='password'
						required={true}
						isValid={signupFormState.validities.repeatedPassword}
						errorMessage={signupFormState.errorMessages.repeatedPassword}
					/>
				</div>
				<Link to='/login' className='have-account'>
					Have an account already? Login
				</Link>

				<button class='signup-btn' type='submit'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
