import React, { useState } from 'react';
import './dashboard-page.styles.css';
import Loader from '../../../components/shared/loader/Loader.comp';
import AddBookForm from './add-book-form/AddBookForm.comp'
import DashboardBooks from './dashboard-books/DashboardBooks.comp'

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showClassName, setShowClassName] = useState('');
  const [hideBtn, setHideBtn] = useState('')

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

  const showAddNewBookModal = () => {
    setShowClassName('show-book-form');
    setHideBtn('hide-btn')
  } 

  const closeModal = () => {
    setShowClassName('');
		setHideBtn('');
  }

	return isLoading ? (
		<Loader />
	) : (
		<div className='dashboard'>
			<button
				className={`add-new-book-btn ${hideBtn}`}
				onClick={showAddNewBookModal}>
				Add Book
			</button>
			<div>
				<AddBookForm className={showClassName} closeModal={closeModal} />
				<DashboardBooks className='dashboard-container' />
			</div>
		</div>
	);
};

export default DashboardPage;
