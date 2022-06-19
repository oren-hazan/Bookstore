import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/shared/header/Header.comp';
import Footer from './components/shared/footer/Footer.comp';
import HomePage from './pages/home-page/HomePage.comp';
import NotFoundPage from './pages/not-found-page/notFoundPage.comp';
import LoginPage from './pages/login-page/LoginPage.comp';
import SignupPage from './pages/signup-page/SignupPage.comp';
import CartPage from './pages/cart-page/CartPage.comp';
import BookPage from './pages/book-page/BookPage.comp';
import BooksContextProvider from './contexts/books.context';

const App = () => {
	return (
		<BrowserRouter>
			<BooksContextProvider>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />}></Route>
					<Route path='/login' element={<LoginPage />}></Route>
					<Route path='/signup' element={<SignupPage />}></Route>
					<Route path='/cart' element={<CartPage />}></Route>
					<Route path='/book/:singleBookId' element={<BookPage />}></Route>
					<Route path='*' element={<NotFoundPage />}></Route>
				</Routes>
				<Footer />
			</BooksContextProvider>
		</BrowserRouter>
	);
};

export default App;
