import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cart-page.styles.css';
import { AuthContext } from '../../contexts/Auth.context';
import Loader from '../../components/shared/loader/Loader.comp';
import environment from '../../environments/environments'

const API_URL = environment.API_URL;


const CartPage = () => {
	const navigate = useNavigate();
	const authContextValue = useContext(AuthContext);
	const [cartState, setCartState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [bookID, setBookID] = useState('');
	const [price, setPrice] = useState('');
	const userToken = authContextValue.userToken;

	const calcPrice = (cart) => {
		const pricesArray = [];
		let pricesSum = 0;

		cart.map((book, index) => {
			pricesArray.push(book.bookID.price);
			setBookID(cart[index].bookID._id);
		});

		for (let i = 0; i < pricesArray.length; i++) {
			pricesSum += pricesArray[i];
			setPrice(pricesSum);
		}
	};

	const handleClick = async () => {
		try {
			const response = await fetch(`${API_URL}/cart`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userToken,
				},
				body: JSON.stringify({ _id: bookID }),
			});

			if (response.status !== 200) throw new Error();
			const responseData = await response.json();
			const cart = responseData.data.books;
			setCartState(cart)

			calcPrice(cart)
			
		} catch (err) {
			alert('Something went wrong!');
		}
	};

	const handleCheckout = async () => {
		try {
			const response = await fetch(`${API_URL}/cart/checkout`, {
				method: 'PATCH',
				headers: {
					Authorization: 'Bearer ' + userToken,
				},
			});
			if (response.status !== 202) throw new Error();
		} catch {
			alert('Something went wrong!');
		}
	};

	useEffect(() => {
		if (!userToken) {
			navigate('/login');
			alert('You must be logged in!');
		} else {
			const getCart = async () => {
				const response = await fetch(`${API_URL}/cart`, {
					headers: {
						Authorization: 'Bearer ' + userToken,
					},
				});
				if (response.status !== 200) throw new Error();

				const responseData = await response.json();
				const cart = responseData.data.cart;
				setCartState(cart);

				calcPrice(cart);

				setTimeout(() => {
					setIsLoading(false);
				}, 1500);
			};
			getCart();
		}
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<div className='cart-container'>
			<ul>
				{cartState.map((book) => {
					return (
						<div className='cart-book-container'>
							<Link to={`/books/${book.bookID._id}`}>
								<img
									className='cart-book-cover'
									src={book.bookID.bookCovered}
									alt={book.bookID.title}
								/>
							</Link>
							<div className='cart-book-detail-container'>
								<h1 className='title'>{book.bookID.title}</h1>
								<h3 className='author'>By {book.bookID.author}</h3>
							</div>
							<div className='price-and-btn-container'>
								<div className='total-price'>Price: {book.bookID.price} $</div>
								<button className='delete-from-cart-btn' onClick={handleClick}>
									Remove
								</button>
							</div>
						</div>
					);
				})}
			</ul>
			{cartState.length === 0 ? (
				<div className='empty-cart'>
					<h1>Your cart is empty</h1>
				</div>
			) : (
				<footer className='cart-footer'>
					<h2 className='total-price'>Total Price: {price}$</h2>
					<button className='checkout-btn' onClick={handleCheckout}>
						Checkout
					</button>
				</footer>
			)}
		</div>
	);
};

export default CartPage;
