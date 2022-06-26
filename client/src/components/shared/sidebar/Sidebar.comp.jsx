import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.styles.css';
import { AuthContext } from '../../../contexts/Auth.context';

const Sidebar = (props) => {
	const AuthContextValue = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:3000/users/logout', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + AuthContextValue.userToken,
				},
			});
			if (response.status !== 200) {
				throw new Error();
			}
			const responseObj = await response.json();
			console.log(responseObj);

			localStorage.removeItem('token');
			AuthContextValue.setUserToken(null);
			props.hideSidebar();
			navigate('/');
		} catch (err) {
			alert('Unable to logout!');
		}
	};
	return (
		<div className={`sidebar-container ${props.className}`}>
			<div className='sidebar'>
				{!AuthContextValue.userToken ? (
					<Link className='link' to='/login' onClick={props.hideSidebar}>
						Login
					</Link>
				) : (
					<Link className='link' to='/cart' onClick={props.hideSidebar}>
						Cart
					</Link>
				)}
				{!AuthContextValue.userToken ? (
					<Link className='link' to='/signup' onClick={props.hideSidebar}>
						Signup
					</Link>
				) : (
					<button className='logout-btn' onClick={handleLogout}>
						logout
					</button>
				)}
			</div>
			<button className='close-btn' onClick={props.hideSidebar}>
				X
			</button>
		</div>
	);
};

export default Sidebar;
