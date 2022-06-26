import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './book-page.styles.css';
import SingleBook from './single-book-page/SingleBook.comp';
import environment from '../../environments/environments'

const API_URL = environment.API_URL;

const BookPage = () => {
	const params = useParams();
	const [singleBookState, setSingleBookState] = useState({});
	const value = singleBookState;

	useEffect(() => {
		const getBookByID = async () => {
			try {
				const response = await fetch(`${API_URL}/books/${params.bookID}`);
				if (response.status !== 200) throw new Error();

				const responseData = await response.json();
				const book = responseData.data;

				setSingleBookState(book)
			} catch (err) {
				alert('Something wrong!');
			}
		};
		getBookByID();
	}, []);

	return (
		<SingleBook
			id={value.id}
			author={value.author}
			bookCovered={value.bookCovered}
			description={value.description}
			pages={value.pages}
			price={value.price}
			title={value.title}
		/>
	);
};

export default BookPage;
