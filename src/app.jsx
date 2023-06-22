import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreatureCreator } from './creature_creator/creature_creator';
import { Forum } from './forum/forum';
import { UserDatabase } from './user_database/user_database';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
	const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
	const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
	const [authState, setAuthState] = React.useState(currentAuthState);
  
	return (
	  <BrowserRouter>
		<div className='body'>
			<header>
				<nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
					<div className="container-fluid">
						<NavLink className="navbar-brand" to="">
						<img alt="logo" src="logo.png" height="50" width="220" />
						Creature Creator
						</NavLink>
						<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarsExample02"
						aria-controls="navbarsExample02"
						aria-expanded="false"
						aria-label="Toggle navigation"
						>
						<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarsExample02">
							<ul className="navbar-nav me-auto">
								<li className="nav-item">
								<NavLink exact className="nav-link" activeClassName="active" to="">
									Home
								</NavLink>
								</li>
								{authState === AuthState.Authenticated && (
									<li className="nav-item">
									<NavLink className="nav-link" activeClassName="active" to="creature_creator">
										Creature Creator
									</NavLink>
									</li>
								)}
								{authState === AuthState.Authenticated && (
									<li className="nav-item">
									<NavLink className="nav-link" activeClassName="active" to="user_database">
										My Creatures
									</NavLink>
									</li>
								)}
								{authState === AuthState.Authenticated && (
									<li className="nav-item">
									<NavLink className="nav-link" activeClassName="active" to="forum">
										Forum
									</NavLink>
									</li>
								)}
								<li className="nav-item">
								<NavLink className="nav-link" to="/" onClick={logout}>
									Logout
								</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
  
			<Routes>
				<Route
					path="/"
					element={
					<Login
						userName={userName}
						authState={authState}
						onAuthChange={(userName, authState) => {
						setAuthState(authState);
						setUserName(userName);
						}}
					/>
					}
					exact
				/>
				<Route path="/user_database" element={<UserDatabase userName={userName} />} />
				<Route path="/creature_creator" element={<CreatureCreator />} />
				<Route path="/forum" element={<Forum />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
  
			<footer class=" footer mt-auto py-3">
				<div class="container">
					<span>Bryson Williams</span>
					<br />
					<a href="https://github.com/bwilliams0303/startup">GitHub</a>
				</div>
			</footer>
		</div>
	  </BrowserRouter>
	);
  }
  
  function NotFound() {
	return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  
  export default App;