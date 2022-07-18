import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './book-page.styles.css';
import SingleBook from './single-book-page/SingleBook.comp';
import { getBook } from '../../services/book.service'

const BookPage = () => {
	const params = useParams();
	const [singleBookState, setSingleBookState] = useState({});
	const value = singleBookState;

	useEffect(() => {
		const getBookByID = async () => {
			const bookID = params.bookID
			try {
				const book = await getBook(bookID)

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
