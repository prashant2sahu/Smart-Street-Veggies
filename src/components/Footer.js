function Footer() {
    return (
        <footer
            className="text-white"
            style={{
                backgroundColor: '#2B4F61',
                position: 'absolute',
                bottom: 0,
                left: 0,
                height:"fit-content",
                top:"850px",
                width: '100%',
                marginTop:"90px",
                zIndex: 1, // Ensures the footer appears above other content if needed
            }}
        >
            <div className="container-fluid">
                <div className="row py-4">
                    
                    {/* About Us Section */}
                    <div className="col-md-4 ml-4 text-center text-md-start">
                        <h5>About Us</h5>
                        <p>
                            We are dedicated to providing excellent services and products to our customers.
                            Our goal is to offer value and ensure satisfaction in every experience.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-3 mb-4 text-center">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Services</a></li>
                            <li><a href="#" className="text-white text-decoration-none">About</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 mb-4 text-center">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Services</a></li>
                            <li><a href="#" className="text-white text-decoration-none">About</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    {/* Contact Us Section */}
                    <div className="col-md-3 mb-4 text-center text-md-end">
                        <h5>Contact Us</h5>
                        <p>Email: SmartStreetVeggie@example.com</p>
                        <p>Phone: +8982577876</p>
                        <div>
                            <a href="#" className="text-white me-2 text-decoration-none">Facebook</a>
                            <a href="#" className="text-white me-2 text-decoration-none">Twitter</a>
                            <a href="#" className="text-white text-decoration-none">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </footer>
    );
}

export default Footer;
