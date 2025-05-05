import React from 'react';
import { Routes, Route } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import Nav from './components/Nav/Nav';
import HomePage from './pages/Homepage/HomePage';
import Footer from './components/Footer/Footer';
import Error404Page from './pages/404';


import './App.scss';

function App() {
	smoothscroll.polyfill();
	return (
		<div id="app" className="app-wrapper">
			<Nav />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<Error404Page />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
