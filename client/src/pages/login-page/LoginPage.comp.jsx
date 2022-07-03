import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login-page.styles.css';
import Loader from '../../components/shared/loader/Loader.comp';
import { AuthContext } from '../../contexts/Auth.context';
import LoginForm from './login-form/LoginForm.comp'


const LoginPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const authContextValue = useContext(AuthContext);
	
	useEffect(() => {
		if (authContextValue.adminToken) {
			navigate('/admin/dashboard');
			alert('Logout as a Admin first!');
		}
		else if (authContextValue.userToken) {
			navigate('/')
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<div className='login'>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
