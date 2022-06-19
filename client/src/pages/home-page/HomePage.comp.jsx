import './home-page.styles.css';
import BooksContainer from './books-container/BooksContainer.comp';
import React, { useEffect, useContext } from 'react';
import { BooksContext } from '../../contexts/books.context';
import { initBooksAction } from '../../actions/books.action';

const HomePage = () => {
	const booksContextValue = useContext(BooksContext);

	useEffect(() => {
		const getBooks = async () => {
			try {
				const response = await fetch('http://localhost:3000/books');
				if (response.status !== 200) {
					throw new Error();
				}
				const responseData = await response.json();
				const books = responseData.data.books;
				console.log(books)

				const action = initBooksAction(books);
				booksContextValue.dispatchBooksState(action);
			} catch (err) {
				alert('Something wrong!');
			}
		};
		getBooks();
	}, []);
	
	return (
		<div>
			<BooksContainer />
		</div>
	);
};

export default HomePage;
