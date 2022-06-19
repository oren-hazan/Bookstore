import React, { useContext } from 'react';
import './books-container.styles.css';
import Book from '../books-container/book/Book.comp';
import { BooksContext } from '../../../contexts/books.context'

const BooksContainer = () => {

	const booksContextValue = useContext(BooksContext)
	
	return (
		<ul className="books-container">
		{booksContextValue.booksState.map((book, index) => {
			return <Book id={book._id} author={book.author} bookCovered={book.bookCovered} description={book.description} pages={book.pages} price={book.price} title={book.title} index={index}/>
		})}
		</ul>
	);
};

export default BooksContainer;
