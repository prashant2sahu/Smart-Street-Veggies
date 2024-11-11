// Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="text-white p-0" style={{ backgroundColor: '#222',marginLeft:"-366px", width: '100%',position:"absolute " }}>
            <div className="container">
                <div className="row">
                    {/* About Us Section */}
                    <div className="col-md-4 mb-4 text-center text-md-start">
                        <h5>About Us</h5>
                        <p>
                            We are dedicated to providing excellent services and products to our customers.
                            Our goal is to offer value and ensure satisfaction in every experience.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-4 mb-4 text-center">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Services</a></li>
                            <li><a href="#" className="text-white text-decoration-none">About</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div className="col-md-4 mb-4 text-center text-md-end">
                        <h5>Contact Us</h5>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 234 567 890</p>
                        <div>
                            <a href="#" className="text-white me-2 text-decoration-none">Facebook</a>
                            <a href="#" className="text-white me-2 text-decoration-none">Twitter</a>
                            <a href="#" className="text-white text-decoration-none">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center py-3" style={{ backgroundColor: '#111' }}>
                <small>&copy; 2024 Your Company Name. All Rights Reserved.</small>
            </div>
        </footer>
    );
}

export default Footer;
