import environments from '../environments/environments';

const API_URL = environments.API_URL;

export const userLogin = async (data) => {
    const response = await fetch(`${API_URL}/users/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					});
					if (response.status !== 200) throw new Error();

					const responseData = await response.json();

                    return responseData
}

export const userSignup = async (data) => {
	const response = await fetch(`${API_URL}/users/new`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (response.status !== 201) {
		throw new Error();
	}
	const responseData = await response.json();
	return responseData
}

export const userLogout = async (token) => {
	const response = await fetch(
		`${API_URL}/users/logout`,
		{
			method: 'POST',
			headers: {
				Authorization:
					'Bearer ' + token,
			},
		}
	);
	if (response.status !== 200) {
		throw new Error();
	}
	localStorage.removeItem('token')
}
