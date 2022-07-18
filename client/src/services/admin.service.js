import environments from '../environments/environments';

const API_URL = environments.API_URL;

export const adminLogin = async (data) => {
	const response = await fetch(`${API_URL}/admin/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (response.status !== 200) throw new Error();

	const responseData = await response.json();

	return responseData;
};

export const adminLogout = async (token) => {
	const response = await fetch(`${API_URL}/admin/logout`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
	if (response.status !== 200) {
		throw new Error();
	}
	localStorage.removeItem('admin-token')
};