import React, { useContext, useEffect } from 'react';
import './book-page.styles.css';
import { BooksContext } from '../../contexts/books.context';
import { initSingleBookAction } from '../../actions/books.action';
import SingleBook from './single-book-page/SingleBook.comp';

const BookPage = () => {
	const booksContextValue = useContext(BooksContext);

	const bookID = booksContextValue.singleBookIDState;
	const value = booksContextValue.singleBookState;

	useEffect(() => {
		const getBookByID = async () => {
			try {
				const response = await fetch(`http://localhost:3000/books/${bookID}`);
				if (response.status !== 200) throw new Error();

				const responseData = await response.json();
				const book = responseData.data;

				const action = initSingleBookAction(book);
				booksContextValue.dispatchSingleBookState(action);
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
