import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import UpdateBookForm from '../../dashboard-page/update-book-form/UpdateBookForm.comp'
import './dashboard-books.styles.css'
import { getAllBooks } from '../../../../services/book.service'

const DashboardBooks = () => {
	const navigate = useNavigate();
	const [booksState, setBooksState] = useState([]);
	const [showClassName, setShowClassName] = useState('');
	const [bookState, setBookState] = useState('')
	const [index, setIndex] = useState('')
	const [bookID, setBookID] = useState('')
	const adminToken = localStorage.getItem('admin-token')

	if(!adminToken) {
		navigate('/admin')
	}
	useEffect(() => {
		const getBooks = async () => {
			try {
				const books = await getAllBooks()

				setBooksState(books);

			} catch (err) {
				alert('Something wrong!');
			}
		};

		getBooks();
	}, []);

	const showUpdateBookModal = (index, bookID) => {
		setShowClassName('show-update-form');
		setBookState(booksState[index])
		setIndex(index);
		setBookID(bookID)
		return
	}; 

	const closeModal = () => {
		setShowClassName('');
	};

	return (
		<div>
			<ul className='dashboard-books-container'>
				{booksState.map((book, index) => {
					return (
						<div>
							<div
								className='book-container'
								id={book.id}
								onClick={() => showUpdateBookModal(index, book._id)}>
								<img className='img' src={book.bookCovered} alt={book.title} />
								<h2 className='title'>{book.title}</h2>
								<h4 className='author'>{book.author}</h4>
							</div>
						</div>
					);
				})}
			</ul>
			<UpdateBookForm className={showClassName} closeModal={closeModal}
			bookState={bookState} index={index} bookID={bookID}
			/>
		</div>
	);
};

export default DashboardBooks;
