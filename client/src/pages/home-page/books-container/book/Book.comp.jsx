import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import './book.styles.css';
import { BooksContext } from '../../../../contexts/books.context'

const Book = (props) => {
		const navigate = useNavigate();
		const booksContextValue = useContext(BooksContext);
		const singleBookId = props.id

	const handleClick = () => {
		booksContextValue.setSingleBookIDState(singleBookId);
		navigate(`/book/${singleBookId}`);
	} 

	return (
			<div className='book-container' id={props.id} onClick={handleClick}>
				<img className='img' src={props.bookCovered} alt={props.title} />
				<h2 className='title'>{props.title}</h2>
				<h4 className='author'>{props.author}</h4>
			</div>
	);
};

export default Book;
