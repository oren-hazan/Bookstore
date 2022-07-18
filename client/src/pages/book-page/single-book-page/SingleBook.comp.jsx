import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './single-book.styles.css';
import { AuthContext } from '../../../contexts/Auth.context';
import Loader from '../../../components/shared/loader/Loader.comp';
import { addToUserCart } from '../../../services/cart.service';

const SingleBook = (props) => {
	const navigate = useNavigate();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	const handleClick = () => {
		if (!userToken) {
			navigate('/login');
			alert('You must be logged in!');
		} else {

			const addToCart = async () => {
				const bookID = params.bookID;
	
				try {
				await addToUserCart(userToken, bookID);
				} catch (err) {
					alert('Something went wrong!');
				}
			};
			addToCart();
		};
		}

	return isLoading ? (
		<Loader />
	) : (
		<div className='single-book-container'>
			<img className='book-cover' src={props.bookCovered} alt={props.title} />
			<div className='detail-container'>
				<h1 className='title'>{props.title}</h1>
				<h3 className='author'>By {props.author}</h3>
				<div className='description'>{props.description}</div>
				<footer className='detail-footer'>
					<div className='pages'>Pages: {props.pages}</div>
					<div className='price'>Price: {props.price} $</div>
				</footer>
				<button className='add-to-cart-btn' onClick={handleClick}>
					Add To Cart
				</button>
			</div>
		</div>
	);
};

export default SingleBook;
