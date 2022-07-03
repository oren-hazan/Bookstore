import React from 'react'
import './cart-book.styles.css'
import { Link } from 'react-router-dom';

const CartBook = (props) => {
  return (
		<div>
			<div className='cart-book-container'>
				<Link to={`/books/${props._id}`}>
					<img
						className='cart-book-cover'
						src={props.bookCovered}
						alt={props.title}
					/>
				</Link>
				<div className='cart-book-detail-container'>
					<h1 className='title'>{props.title}</h1>
					<h3 className='author'>By {props.author}</h3>
				</div>
				<div className='price-and-btn-container'>
					<div className='total-price'>Price: {props.price} $</div>
					<button className='delete-from-cart-btn' onClick={props.onClick}>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartBook