import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth.context';
import './admin-login-page.styles.css';
import Loader from '../../../components/shared/loader/Loader.comp';
import AdminLoginForm from './admin-login-form/AdminLoginForm.comp';

const AdminLoginPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const authContextValue = useContext(AuthContext);
	const user = authContextValue.userToken;

	useEffect(() => {
		if (user) {
			navigate('/');
			alert('Logout as a user first!');
		} else if (authContextValue.adminToken) {
			navigate('/admin/dashboard');
		} else {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		}
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<div className='admin-login'>
			<AdminLoginForm />
		</div>
	);
};

export default AdminLoginPage;
