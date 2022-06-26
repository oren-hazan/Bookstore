import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './single-book.styles.css';
import { AuthContext } from '../../../contexts/Auth.context';
import Loader from '../../../components/shared/loader/Loader.comp';
import environment from '../../../environments/environments'

const API_URL = environment.API_URL

const SingleBook = (props) => {
	const navigate = useNavigate();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const authContextValue = useContext(AuthContext);
	const userToken = authContextValue.userToken;

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
					const response = await fetch(`${API_URL}/cart/add-to-cart`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + userToken,
						},
						body: JSON.stringify({ bookID }),
					});
	
					if (response.status !== 202) throw new Error();
	
					alert('Book saved successfully!')
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
