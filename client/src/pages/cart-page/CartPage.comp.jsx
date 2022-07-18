import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart-page.styles.css';
import { AuthContext } from '../../contexts/Auth.context';
import Loader from '../../components/shared/loader/Loader.comp';
import CartBook from './cart-book/CartBook.comp';
import { getUserCart, deleteFromCart, checkOut } from '../../services/cart.service'

const CartPage = () => {
	const navigate = useNavigate();
	const { userToken } = useContext(AuthContext);
	const [cartState, setCartState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [price, setPrice] = useState('');

	const calcPrice = (cart) => {
		const pricesArray = [];
		let pricesSum = 0;

		cart.map((book) => {
			pricesArray.push(book.bookID.price);
		});

		for (let i = 0; i < pricesArray.length; i++) {
			pricesSum += pricesArray[i];
			setPrice(pricesSum);
		}
	};

	const handleClick = async (bookID) => {
		try {
			const cart = await deleteFromCart(userToken, bookID);
			setCartState(cart);

			calcPrice(cart);
		} catch (err) {
			alert('Something went wrong!');
		}
	};

	const handleCheckout = async () => {
		try {
			const cart = await checkOut(userToken)
			setCartState(cart);
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

				const cart = await getUserCart(userToken);
				
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
						<CartBook
							onClick={() => handleClick(book.bookID._id)}
							bookCovered={book.bookID.bookCovered}
							title={book.bookID.title}
							author={book.bookID.author}
							price={book.bookID.price}
							id={book.bookID._id}
						/>
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
