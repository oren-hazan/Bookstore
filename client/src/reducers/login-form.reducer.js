/* eslint-disable default-case */
import loginFormActionTypes from '../actions/login-form.actions';

export const LOGIN_FORM_INITIAL_STATE = {
	values: {
		email: '',
		password: '',
	},

	validities: {
		email: false,
		password: false,
	},

	errorMessages: {
		email: '',
		password: '',
	},
};

const loginReducer = (state, action) => {
	switch (action.type) {
		case loginFormActionTypes.UPDATE_EMAIL: {
			const updateEmailValue = action.payload.value;
			const updateIsEmailValid = action.payload.isValid;
			const updateEmailErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, email: updateEmailValue };
			const updateValidities = {
				...state.validities,
				email: updateIsEmailValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				email: updateEmailErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case loginFormActionTypes.UPDATE_PASSWORD: {
			const updatePasswordValue = action.payload.value;
			const updateIsPasswordValid = action.payload.isValid;
			const updatePasswordErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, password: updatePasswordValue };
			const updateValidities = {
				...state.validities,
				password: updateIsPasswordValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				password: updatePasswordErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
	}
	return state;
};

export default loginReducer;
