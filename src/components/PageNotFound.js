import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundGif from '../assets/NotFoundPage.gif'; // replace with the path to your GIF
import '../StyleSheet/PageNotFound.css';

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className=" d-flex justify-content-center  bg-light  align-items-center vh-100">
			<div className="d-flex flex-column align-items-center text-center bg-light p-2 rounded" id="ManageMobile">
				<h1 className="display-4 text-danger mb-4 typing-animation">404 - Page Not Found</h1>
				<p className="text-muted mb-4">Oops! The page you're looking for doesn't exist.</p>
				
				<img src={NotFoundGif} alt="404 Not Found" className="img-fluid mb-4" style={{ maxWidth: '300px' }} />

				<button className="btn btn-primary" onClick={() => navigate('/')}>
					Go Back to Home
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
