const signupFormActionTypes = {
    UPDATE_FIRST_NAME: 'UPDATE_FIRST_NAME',
    UPDATE_LAST_NAME: 'UPDATE_LAST_NAME',
	UPDATE_EMAIL: 'UPDATE_EMAIL',
	UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_REPEATED_PASSWORD: 'UPDATE_REPEATED_PASSWORD'
};

export const updateFirstNameAction = (value, isValid, errorMessage) => {
	const action = {
		type: signupFormActionTypes.UPDATE_FIRST_NAME,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updateLastNameAction = (value, isValid, errorMessage) => {
	const action = {
		type: signupFormActionTypes.UPDATE_LAST_NAME,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updateEmailAction = (value, isValid, errorMessage) => {
	const action = {
		type: signupFormActionTypes.UPDATE_EMAIL,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updatePasswordAction = (value, isValid, errorMessage) => {
	const action = {
		type: signupFormActionTypes.UPDATE_PASSWORD,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export const updateRepeatedPasswordAction = (value, isValid, errorMessage) => {
	const action = {
		type: signupFormActionTypes.UPDATE_REPEATED_PASSWORD,
		payload: {
			value: value,
			isValid: isValid,
			errorMessage: errorMessage,
		},
	};
	return action;
};

export default signupFormActionTypes;
