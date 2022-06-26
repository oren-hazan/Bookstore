import signupFormActionTypes from '../actions/signup-form.actions';

export const SIGNUP_FORM_INITIAL_STATE = {
	values: {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatedPassword: '',
	},

	validities: {
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		repeatedPassword: false,
	},

	errorMessages: {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatedPassword: '',
	},
};

const signupReducer = (state, action) => {
	switch (action.type) {
		case signupFormActionTypes.UPDATE_FIRST_NAME: {
			const updateFirstNameValue = action.payload.value;
			const updateIsFirstNameValid = action.payload.isValid;
			const updateFirstNameErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, firstName: updateFirstNameValue };
			const updateValidities = {
				...state.validities,
				firstName: updateIsFirstNameValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				firstName: updateFirstNameErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case signupFormActionTypes.UPDATE_LAST_NAME: {
			const updateLastNameValue = action.payload.value;
			const updateIsLastNameValid = action.payload.isValid;
			const updateLastNameErrorMessage = action.payload.errorMessage;

			const updateValues = { ...state.values, lastName: updateLastNameValue };
			const updateValidities = {
				...state.validities,
				lastName: updateIsLastNameValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				lastName: updateLastNameErrorMessage,
			};

			const updatedState = {
				values: updateValues,
				validities: updateValidities,
				errorMessages: updateErrorMessages,
			};
			return updatedState;
		}
		case signupFormActionTypes.UPDATE_EMAIL: {
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
		case signupFormActionTypes.UPDATE_PASSWORD: {
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
		case signupFormActionTypes.UPDATE_REPEATED_PASSWORD: {
			const updateRepeatedPasswordValue = action.payload.value;
			const updateIsRepeatedPasswordValid = action.payload.isValid;
			const updateRepeatedPasswordErrorMessage = action.payload.errorMessage;

			const updateValues = {
				...state.values,
				repeatedPassword: updateRepeatedPasswordValue,
			};
			const updateValidities = {
				...state.validities,
				repeatedPassword: updateIsRepeatedPasswordValid,
			};
			const updateErrorMessages = {
				...state.errorMessages,
				repeatedPassword: updateRepeatedPasswordErrorMessage,
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

export default signupReducer;
