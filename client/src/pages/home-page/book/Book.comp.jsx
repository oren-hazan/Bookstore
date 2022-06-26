import React from 'react';
import { useNavigate } from 'react-router-dom'
import './book.styles.css';

const Book = (props) => {
		const navigate = useNavigate();
		const bookID = props.id

	const handleClick = () => {
		navigate(`/books/${bookID}`);
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
