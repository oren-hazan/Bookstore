import environments from '../environments/environments';

const API_URL = environments.API_URL;

export const getAllBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
		if (response.status !== 200) {
			throw new Error();
		}
		const responseData = await response.json();
		const books = responseData.data.books;
        return books
}

export const getBook = async (bookID) => {
    const response = await fetch(`${API_URL}/books/${bookID}`);
		if (response.status !== 200) throw new Error();

		const responseData = await response.json();
		const book = responseData.data;
        return book
};

export const createBook = async (token, data) => {
    const response = await fetch(`${API_URL}/books/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(data),
		});

		if (response.status !== 201) throw new Error();
};

export const updateBook = async (token, bookID, data) => {
    const response = await fetch(`${API_URL}/books/${bookID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(data),
		});

		if (response.status !== 200) throw new Error();
};

export const deleteBook = async (token, bookID) => {
    const response = await fetch(`${API_URL}/books/${bookID}`, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		if (response.status !== 200) throw new Error();
};