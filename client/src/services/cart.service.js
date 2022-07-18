import environments from '../environments/environments';

const API_URL = environments.API_URL

export const deleteFromCart = async (token, bookID) => {
    const response = await fetch(`${API_URL}/cart`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify({ _id: bookID }),
		});

		if (response.status !== 200) throw new Error();
		const responseData = await response.json();
		const cart = responseData.data.books;
        return cart
}

export const checkOut = async (token) => {
    const response = await fetch(`${API_URL}/cart/checkout`, {
			method: 'PATCH',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		if (response.status !== 202) throw new Error();
		const responseData = await response.json();
		const cart = responseData.data.books;
        return cart
};

export const getUserCart = async (token) => {
    const response = await fetch(`${API_URL}/cart`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		if (response.status !== 200) throw new Error();

		const responseData = await response.json();
		const cart = responseData.data.cart;
        return cart
};

export const addToUserCart = async (token, bookID) => {
    	const response = await fetch(`${API_URL}/cart/add-to-cart`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify({ bookID }),
			});

			if (response.status !== 202) throw new Error();

			alert('Book saved successfully!');
}
