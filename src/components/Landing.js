import React from 'react';
import { Container, Row, Col, Card, Button,Carousel } from 'react-bootstrap';
import LandingImg from '../assets/LandingPAge.jpg'
import Aboutinfo from '../assets/aboutInfo.jpg'
import '../StyleSheet/landing.css'
import Footer from '../components/Footer'
import CARROT from '../assets/carrot-removebg-preview.png'
import CUCUMBER from '../assets/CUCUMBER.png'
const Landing = () => {
    return (
        <>
            <div className=' w-100'>
                {/* Hero Section */}
                <div className="text-center text-white pb-5 position-relative mobileLAyout"  style={{
                   
                    display: 'flex',
                    justifyContent: 'center',  // Horizontally center the content
                    alignItems: 'center',
                    marginTop:"-20px"
                }}>
                    <img
                     className='img-fluid'
                        src={LandingImg}
                        alt="Smart Street Veggies"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute', // Ensures the image stays in the background
                            top: '0',
                            left: '0',
                            zIndex: '-1', // This ensures the image stays behind the text
                        }}
                    />
                    <div className="position-relative">
                        <h1 className="display-4 fw-bold mainHead" >Smart Street Veggies</h1>
                        <p className="lead mainHead">Fresh, Organic, and Sustainable Veggies Delivered Right to Your Doorstep</p>
                        <Button href="#products" variant="success" size="lg" className="mt-3">
                            Explore Our Products
                        </Button>
                    </div>
                </div>




                {/* About Us Section */}
                <Container className="pt-5" id="Aboutuski">
                    <h2 className="text-center  fw-bold mb-4">About Smart Street Veggies</h2>
                    <Row  className="aboutParra">
                        <Col md={6} className="aboutParraContent">
                            <p clign="center" style={{wordSpacing:"16px",textAlign: "justify" }}>
                                Smart Street Veggies offers fresh, organic vegetables directly to your doorstep, making healthy eating convenient and accessible. Through our user-friendly app, you can easily browse a wide selection of veggies and book your order with just a few clicks.
                                What makes Smart Street Veggies even more unique is our Cartman service, designed to make your shopping experience even smoother. Cartman allows you to easily compare prices of vegetables from different vendors and select the one that suits your budget. With just a few taps, you can book your fresh produce and have it delivered right to your door.
                                Whether you are a busy professional, a home cook, or anyone looking for fresh, nutritious veggies, Smart Street Veggies makes it simple for everyone to shop and eat healthy.
                                Choose Smart Street Veggies today, where fresh food meets convenience!
                            </p>
                        </Col>
                        <Col md={6}>
                            <img
                                src={Aboutinfo}
                                alt="Farm Fresh Veggies"
                                className="img rounded"
                             
                            />
                        </Col>
                    </Row>
                </Container>

                {/* Products Section */}
               
                <div id="products" className="bg-light py-5">
  <Container className="crousouelDisplay">
    <h2 className="text-center fw-bold mb-4">Our Fresh Produce</h2>
    <Carousel>
      <Carousel.Item>
        <Row className="d-flex justify-content-between">
          <Col xs={12} sm={4} md={4} className="mb-4">
            <Card>
              <Card.Img className="carousel-image" variant="top" src="https://pngimg.com/uploads/tomato/tomato_PNG12591.png" />
              <Card.Body>
                <Card.Title>Organic Tomatoes</Card.Title>
                <Card.Text>Rich in flavor and perfect for your recipes.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} className="mb-4">
            <Card>
              <Card.Img className="carousel-image" variant="top" src={CARROT} />
              <Card.Body>
                <Card.Title>Crunchy Carrots</Card.Title>
                <Card.Text>Full of nutrients and freshly harvested.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} className="mb-4">
            <Card>
              <Card.Img className="carousel-image" variant="top" src="https://pngimg.com/uploads/spinach/spinach_PNG10.png" />
              <Card.Body>
                <Card.Title>Fresh Spinach</Card.Title>
                <Card.Text>Healthy greens for your daily diet.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <Row className="d-flex justify-content-between">
          <Col xs={12} sm={4} md={4} className="mb-4">
            <Card>
              <Card.Img className="carousel-image" variant="top" src="https://trikaya.net/cdn/shop/products/LettuceLeafytabletop_250x.jpg?v=1594756664" />
              <Card.Body>
                <Card.Title>Fresh Lettuce</Card.Title>
                <Card.Text>Perfect for salads and healthy meals.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} className="mb-4">
            <Card>
              <Card.Img className="carousel-image" variant="top" src={CUCUMBER} />
              <Card.Body>
                <Card.Title>Organic Cucumbers</Card.Title>
                <Card.Text>Fresh, crunchy, and full of hydration.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} className="mb-4">
            <Card>
              <Card.Img className="carousel-image" variant="top" src="https://pngimg.com/uploads/pepper/pepper_PNG99157.png" />
              <Card.Body>
                <Card.Title>Healthy Bell Peppers</Card.Title>
                <Card.Text>Rich in vitamins and full of flavor.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Carousel.Item>
    </Carousel>
  </Container>
</div>



                {/* Why Choose Us Section */}
                <Container className="py-5">
                    <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>
                    <Row className="text-center">
                        <Col md={4} className="mb-3">
                            <h5>100% Organic</h5>
                            <p>Our produce is grown naturally without any chemicals.</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <h5>Freshly Delivered</h5>
                            <p>Get farm-fresh vegetables delivered to your doorstep.</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <h5>Sustainable Practices</h5>
                            <p>We care about the environment and promote sustainability.</p>
                        </Col>
                    </Row>
                </Container>

                {/* Customer Testimonials Section */}
                <Container className="bg-light py-5">
                    <h2 className="text-center fw-bold mb-4">What Our Customers Say</h2>
                    <Row>
                        <Col md={4} className="mb-4">
                            <blockquote className="blockquote text-center">
                                <p className="mb-0">"Best veggies I’ve ever tasted! So fresh and flavorful."</p>
                            </blockquote>
                        </Col>
                        <Col md={4} className="mb-4">
                            <blockquote className="blockquote text-center">
                                <p className="mb-0">"The delivery was quick and the quality was amazing."</p>
                            </blockquote>
                        </Col>
                        <Col md={4} className="mb-4">
                            <blockquote className="blockquote text-center">
                                <p className="mb-0">"Sustainable and fresh produce. Highly recommend!"</p>
                            </blockquote>
                        </Col>
                    </Row>
                </Container>

                {/* How It Works Section */}
                <Container className="py-5">
                    <h2 className="text-center fw-bold mb-4">How It Works</h2>
                    <Row className="text-center">
                    <Col md={4} className="mb-4">
      <h5>Step 1: List Your Products</h5>
      <p>As a Cartman, upload your fresh vegetables and set prices on the platform to make them available to customers.</p>
    </Col>

    {/* Step 2: Manage Your Inventory - For Cartman */}
    <Col md={4} className="mb-4">
      <h5>Step 2: Manage Your Inventory</h5>
      <p>Track your vegetable stock in real-time. Our app will notify you when stock is low, ensuring you never run out of fresh produce.</p>
    </Col>

    {/* Step 3: Receive Orders - For Cartman */}
    <Col md={4} className="mb-4">
      <h5>Step 3: Receive Orders</h5>
      <p>Once customers place an order, you’ll get notified. Simply prepare and confirm the order for delivery.</p>
    </Col>

    {/* Step 4: Browse Fresh Produce - For Customers */}
    <Col md={4} className="mb-4">
      <h5>Step 4: Browse Fresh Produce</h5>
      <p>Browse through a wide selection of organic vegetables and choose the best ones for your needs.</p>
    </Col>

    {/* Step 5: Compare Prices - For Customers */}
    <Col md={4} className="mb-4">
      <h5>Step 5: Compare Prices</h5>
      <p>Use the Cartman feature to compare vegetable prices across different vendors to find the best deal.</p>
    </Col>

    {/* Step 6: We Deliver - For Both Cartman & Customer */}
    <Col md={4} className="mb-4">
      <h5>Step 6: We Deliver</h5>
      <p>We take care of delivery! Fresh, organic veggies are delivered straight to your doorstep, making healthy eating hassle-free.</p>
    </Col>
                    </Row>
                </Container>

                {/* Contact Us Section */}
            

                {/* Footer */}
                <footer className="text-center text-white " style={{ backgroundColor: '#343a40' ,position:"relative",top:"-950px"}}>

<Footer/>
                </footer>
            </div></>
    )
}

export default Landing