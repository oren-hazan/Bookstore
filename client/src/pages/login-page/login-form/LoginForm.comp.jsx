import React, { useReducer, useContext } from 'react';
import './login-form.styles.css'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../../../components/shared/custom-input/CustomInput.comp';
import loginReducer, {
	LOGIN_FORM_INITIAL_STATE,
} from '../../../reducers/login-form.reducer';
import {
	updateEmailAction,
	updatePasswordAction,
} from '../../../actions/login-form.actions';
import { AuthContext } from '../../../contexts/Auth.context';
import { userLogin } from '../../../services/user.service'
import isEmail from 'validator/lib/isEmail';

const LoginForm = () => {

	const navigate = useNavigate();
    const { setUserToken } = useContext(AuthContext);

		const [loginFormState, dispatchLoginFormState] = useReducer(
			loginReducer,
			LOGIN_FORM_INITIAL_STATE
		);

		const handleEmailInput = (event) => {
			const textInput = event.target.value.toLowerCase().trim();

			if (textInput === '') {
				dispatchLoginFormState(
					updateEmailAction(textInput, false, '*Example - email@email.com')
				);
				return;
			}

			if (!isEmail(textInput)) {
				dispatchLoginFormState(
					updateEmailAction(
						textInput,
						false,
						'*Please enter a valid email address'
					)
				);
				return;
			}
			dispatchLoginFormState(updateEmailAction(textInput, true, ''));
		};

		const handlePasswordInput = (event) => {
			const textInput = event.target.value.trim();

			if (textInput === '') {
				dispatchLoginFormState(
					updatePasswordAction(textInput, false, '*Please enter your password')
				);
				return;
			}

			const numbers = /[0-9]/g;

			if (
				textInput.length > 20 ||
				textInput.length < 8 ||
				!textInput.match(numbers)
			) {
				dispatchLoginFormState(
					updatePasswordAction(
						textInput,
						false,
						'*You must enter a password with the length of 8-20 characters and must contain at least 1 number'
					)
				);
				return;
			} else {
				dispatchLoginFormState(updatePasswordAction(textInput, true, ''));
			}
		};

		const handleLoginSubmit = async (event) => {
			event.preventDefault();

			const validities = loginFormState.validities;
			const values = loginFormState.values;

			if (validities.email && validities.password) {
				const data = {
					email: values.email,
					password: values.password,
				};

				try {
					const responseData = await userLogin(data);
					const token = responseData.data.token;
					localStorage.setItem('token', token);
					setUserToken(token);

					navigate('/');
				} catch (err) {
					alert('Email or Password wrong!');
				}
				return;
			} else {
				console.log('Login form not valid!');
				dispatchLoginFormState(
					updatePasswordAction(
						values.password,
						false,
						'*Your password is not valid, please try again!'
					)
				);
				return;
			}
		};

  return (
		<form className='login-card' onSubmit={handleLoginSubmit}>
			<h1>Welcome Back!</h1>
			<div>
				<label htmlFor='email'></label>
				<CustomInput
					onInput={handleEmailInput}
					inputClassName={
						!loginFormState.validities.email ? 'error-form-input' : 'form-input'
					}
					type='text'
					id='email'
					placeholder='Email:'
					name='email'
					isValid={loginFormState.validities.email}
					errorMessage={loginFormState.errorMessages.email}
					required={true}
				/>
			</div>
			<div>
				<label htmlFor='password'></label>
				<CustomInput
					onInput={handlePasswordInput}
					inputClassName={
						!loginFormState.validities.password
							? 'error-form-input'
							: 'form-input'
					}
					type='password'
					id='password'
					placeholder='Password:'
					name='password'
					isValid={loginFormState.validities.password}
					errorMessage={loginFormState.errorMessages.password}
					required={true}
				/>
			</div>
			<Link to='/signup' className='forgot-password'>
				Don't have an account? Signup
			</Link>
			<button class='login-btn' type='submit'>
				Login
			</button>
		</form>
	);
}

export default LoginForm