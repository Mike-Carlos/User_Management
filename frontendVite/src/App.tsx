/* eslint-disable react-hooks/exhaustive-deps */


import DashboardHandler from "./pages/DashboardPage";
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import { RootState } from './redux/store/store';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import { apiLogin } from './redux/saga/sessionSaga';
import { setAuthenticationStatus, setUser } from './redux/state/sessionState';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


function App() {

  const isAuthenticated = useSelector((state: RootState) => state.sessionReducer.isAuthenticated);
	console.log("isAuthenticated", isAuthenticated);
	const cookies = new Cookies();
	const dispatch = useDispatch(); // Get the dispatch function from Redux

	useEffect(() => {
		// Check if the user is authenticated in localStorage
		const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

		if (isAuthenticated) {
			// If the user is authenticated, call the login API to get user info
			const username = cookies.get('username'); // Retrieve the username from localStorage
			const password = cookies.get('password'); // Replace with the actual way you retrieve the password or token

			if (isAuthenticated && username && password) {
				apiLogin(username, password)
					.then((userData) => {
						if (userData) {
							// Dispatch an action to update the user state
							dispatch(setUser(userData)); // You should define the setUser action
							// Dispatch an action to update the authentication status
							dispatch(setAuthenticationStatus(true)); // You should define the setAuthenticationStatus action

						}
					})
					.catch((error) => {
						console.error('Error while checking authentication:', error);
					});
			}
		}
	}, [cookies, dispatch]);

  return (
    <div>
      <BrowserRouter>
			<Routes>
				{isAuthenticated ? (
					<>
						<Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard/*" element={<DashboardHandler />} />
						
					</>
				) : (
					<>
						<Route index element={<LoginPage />} />
						<Route path="/" element={<LoginPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
        
    </div>
  );
}

export default App;
