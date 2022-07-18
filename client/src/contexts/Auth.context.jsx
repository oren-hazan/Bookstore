import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const token = localStorage.getItem('token');
	const admin_token = localStorage.getItem('admin-token');
	const INITIAL_STATE = token ? token : null;
	const ADMIN_INITIAL_STATE = admin_token ? admin_token : null;

	const [userToken, setUserToken] = useState(INITIAL_STATE);
	const [adminToken, setAdminToken] = useState(ADMIN_INITIAL_STATE);

	const value = {
		userToken,
		setUserToken,
		adminToken,
		setAdminToken,
	};

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
