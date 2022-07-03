import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.styles.css';
import { AuthContext } from '../../../contexts/Auth.context';
import { Icon } from '@iconify/react';

const Sidebar = (props) => {
	const AuthContextValue = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await fetch(`http://localhost:3000/${AuthContextValue.userToken ? 'users' : 'admin'}/logout`, {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + (AuthContextValue.userToken ? AuthContextValue.userToken : AuthContextValue.adminToken),
				},
			});
			if (response.status !== 200) {
				throw new Error();
			}
			const responseObj = await response.json();
			console.log(responseObj);

			(AuthContextValue.userToken ? localStorage.removeItem('token') : localStorage.removeItem('admin-token'));
			(AuthContextValue.userToken ? AuthContextValue.setUserToken(null) : AuthContextValue.setAdminToken(null));
			props.hideSidebar();
			navigate('/');
		} catch (err) {
			alert('Unable to logout!');
		}
	};
	return (
		<div className={`sidebar-container ${props.className}`}>
			<div className='sidebar'>
				{!AuthContextValue.userToken && !AuthContextValue.adminToken ? (
					<Link
						className='link'
						to='/login'
						onClick={props.hideSidebar}>
						Login
					</Link>
				) : ( (AuthContextValue.userToken ? <Link className='link' to='/cart' onClick={props.hideSidebar}>
						<Icon
							icon='ic:outline-shopping-cart'
							color='white'
							width='35'
							height='35'
						/>
					</Link> : <Link className='link' to='/admin' onClick={props.hideSidebar}>Dashboard</Link>)
					
				)}
				{!AuthContextValue.userToken && !AuthContextValue.adminToken ? (
					 <Link className='link' to='/signup' onClick={props.hideSidebar}>
						Signup
					</Link> 
				) : (
					<button className='logout-btn' onClick={handleLogout}>
						Logout
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
