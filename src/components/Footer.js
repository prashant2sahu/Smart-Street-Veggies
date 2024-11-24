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
                    <div className="col-md-3  ml-4 text-center text-md-start ">
                        <h5  className="manageFooterText1">About Us</h5>
                        <p  className="manageFooterText1" >
                            We are dedicated to providing excellent services and products to our customers.
                            Our goal is to offer value and ensure satisfaction in every experience.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-2 mb-4 text-center ">
                        <h5 className="manageFooterText">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/home" className="text-white text-decoration-none manageFooterText">Home</a></li>
                            {/* <li><a href="#" className="text-white text-decoration-none">Services</a></li>
                            <li><a href="#" className="text-white text-decoration-none">About</a></li> */}
                            <li><a href="/contact" className="text-white text-decoration-none manageFooterText">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4 text-center ">
                          <h5 className="manageFooterText">Follow Us</h5>
    <div>
        <a href="#" className="text-white text-decoration-none me-3 manageFooterText"><i className="fab fa-facebook"></i></a>
        <a href="#" className="text-white text-decoration-none me-3 manageFooterText"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-white text-decoration-none manageFooterText"><i className="fab fa-instagram"></i></a>
    </div>
                    </div>
                    {/* Contact Us Section */}
                    <div className="col-md-4 mb-4 text-center text-md-end  ">
                        <h5 className="manageFooterText">Contact Us</h5>
                        <p className="manageFooterText">Email: SmartStreetVeggie@example.com</p>
                        <p className="manageFooterText">Phone: +8982577876</p>
                        <div className="manageFooterText">
                            <a href="#" className="text-white me-2 text-decoration-none">Facebook</a>
                            <a href="#" className="text-white me-2 text-decoration-none">Twitter</a>
                            <a href="#" className="text-white text-decoration-none">Instagram</a>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "-50px" }}>
      <p style={{ marginRight: "20px" }}className="text-center">Developed By: Prahant Sahu ,Adarsh Suman ,Hardik Dhakite </p>
      {/* <p style={{ marginRight: "20px" }}>Developed By: Prahant Sahu</p>
      <p style={{ marginRight: "20px" }}>Developed By: Prahant Sahu</p> */}
    </div>

    {/* Privacy Policy and Copyright Section */}
    <div className="d-flex justify-content-between manageFooterFooter" style={{ marginTop: "-20px", borderTop: "1px solid white", paddingTop: "10px" }}>
      <p>Privacy Policy</p>
      <p>2024 @ SmartStreetVeggie</p>
    </div>
            </div>
            
            
        </footer>
    );
}

export default Footer;
