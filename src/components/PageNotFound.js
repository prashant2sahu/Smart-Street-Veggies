import React from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import NotFoundGif from './path/to/your-404-gif.gif'; // replace with the path to your GIF

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
			<h1 className="display-4 text-danger mb-3">404 - Page Not Found</h1>
			<p className="text-muted mb-4">Oops! The page you're looking for doesn't exist.</p>
			
			<img src={""} alt="404 Not Found" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />

			<button className="btn btn-primary" onClick={() => navigate('/')}>
				Go Back to Home
			</button>
		</div>
	);
};

export default NotFoundPage;
