import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import SignupForm from './signup-form/SignupForm.comp';
import Loader from '../../components/shared/loader/Loader.comp';
import { AuthContext } from '../../contexts/Auth.context';
import './signup-page.styles.css';

const SignupPage = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const { userToken, adminToken } = useContext(AuthContext);

	useEffect(() => {
		if (adminToken) {
			navigate('/admin/dashboard');
			alert('Logout as a Admin first!');
		} else if (userToken) {
			navigate('/');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<div className='signup'>
			<SignupForm />
		</div>
	);
};

export default SignupPage;
