import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.styles.css';
import { AuthContext } from '../../../contexts/Auth.context';
import { Icon } from '@iconify/react';
import { userLogout } from '../../../services/user.service'
import { adminLogout } from '../../../services/admin.service'

const Sidebar = (props) => {
	const AuthContextValue = useContext(AuthContext);
	const navigate = useNavigate();
	const userToken = AuthContextValue.userToken;
	const adminToken = AuthContextValue.adminToken;

	const handleLogout = async () => {
		try {
			userToken ? AuthContextValue.setUserToken(null) : AuthContextValue.setAdminToken(null)
			userToken ? await userLogout(userToken) : await adminLogout(adminToken); 

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
