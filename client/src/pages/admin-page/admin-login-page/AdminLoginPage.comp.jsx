import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth.context';
import './admin-login-page.styles.css';
import Loader from '../../../components/shared/loader/Loader.comp';
import AdminLoginForm from './admin-login-form/AdminLoginForm.comp';

const AdminLoginPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const { userToken, adminToken } = useContext(AuthContext);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		if (userToken) {
			navigate('/');
			alert('Logout as a user first!');
		} else if (adminToken) {
			navigate('/admin/dashboard');
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
