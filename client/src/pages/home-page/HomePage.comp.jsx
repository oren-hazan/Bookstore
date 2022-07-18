import React, { useState, useEffect } from 'react';
import './home-page.styles.css';
import Book from './book/Book.comp';
import Loader from '../../components/shared/loader/Loader.comp'
import { getAllBooks } from '../../services/book.service'

const HomePage = () => {

const [booksState, setBooksState] = useState([])
const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const getBooks = async () => {
			try {
				const books = await getAllBooks()

				setBooksState(books)

				setTimeout(() => {
					setIsLoading(false);
				}, 1500);
			} catch (err) {
				alert('Something wrong!');
			}
		};

		getBooks();
	}, []);
	
	return isLoading ? (
		<Loader />
	) : (
		<ul className='books-container'>
			{booksState.map((book, index) => {
				return (
					<Book
						id={book._id}
						author={book.author}
						bookCovered={book.bookCovered}
						description={book.description}
						pages={book.pages}
						price={book.price}
						title={book.title}
						index={index}
					/>
				);
			})}
		</ul>
	);
};

export default HomePage;
