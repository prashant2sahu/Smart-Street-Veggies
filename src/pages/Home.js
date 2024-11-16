import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../StyleSheet/Home.css';  // Import custom CSS for styling
import CUCUMBER from '../assets/CUCUMBER.png'
import KALE from '../assets/KALE.png'
import POTATO from '../assets/POTATO.png'
import CARROT from '../assets/carrot-removebg-preview.png'
import Footer from '../components/Footer'
const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const vegetables = [
      {
        name: 'Carrot',
        image: CARROT, // Replace with actual path
        description: 'Carrots are great for your vision due to their high beta-carotene content, which the body converts into vitamin A. They are also rich in fiber, which promotes digestive health, and antioxidants that help in reducing the risk of chronic diseases.',
        vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K1'],
        protein: '0.9g per 100g',
        types: 'Root vegetable, Orange variety',
      },
      {
        name: 'Spinach',
        image: 'https://pngimg.com/uploads/spinach/spinach_PNG10.png',
        description:'Spinach is a nutrient-rich leafy green vegetable known for its numerous health benefits. It is a powerhouse of vitamins, minerals, and antioxidants',
        vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Folate'],
        protein: '2.9g per 100g',
        types: 'Leafy green vegetable',
      },
      {
        name: 'Broccoli',
        image: '	https://pngimg.com/uploads/broccoli/broccoli_PNG72870.png',
        description: 'Broccoli is well-known for its immune-boosting properties due to its high Vitamin C content. It also contains Vitamin K, folate, potassium, and iron. The presence of sulforaphane, an antioxidant found in broccoli, supports the body’s detoxification processes and may reduce the risk of cancer.',
        vitamins: ['Vitamin C', 'Vitamin K', 'Folate'],
        protein: '2.8g per 100g',
        types: 'Cruciferous vegetable, Green variety',
      },
      {
        name: 'Tomato',
        image: 'https://pngimg.com/uploads/tomato/tomato_PNG12591.png', // Replace with actual path
        description: 'Tomatoes are rich in antioxidants, especially lycopene, which is associated with a reduced risk of heart disease and certain cancers. They are an excellent source of Vitamin C, Vitamin A (in the form of beta-carotene), Vitamin K, folate, and potassium.',
        vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin K'],
        protein: '0.9g per 100g',
        types: 'Fruiting vegetable, Red variety',
      },
      {
        name: 'Cucumber',
        image: CUCUMBER, // Replace with actual path
        description: 'Cucumbers are low in calories but packed with hydration, making them an excellent snack for keeping the body hydrated. They are rich in Vitamin K, which supports bone health, and contain Vitamin C and potassium. Cucumbers also have antioxidants, such as beta-carotene, which help reduce inflammation and promote overall health.',
        vitamins: ['Vitamin K', 'Vitamin C'],
        protein: '0.6g per 100g',
        types: 'Fruiting vegetable, Green variety',
      },
      {
        name: 'Bell Pepper',
        image: 'https://pngimg.com/uploads/pepper/pepper_PNG99157.png',
        description: 'Bell peppers are an excellent source of Vitamin C, which helps boost the immune system and promotes healthy skin. They also contain Vitamin A, Vitamin B6, and folate. The antioxidants, including carotenoids, contribute to eye health and reduce the risk of chronic diseases.',
        vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin B6'],
        protein: '0.9g per 100g',
        types: 'Fruiting vegetable, Colorful varieties (green, red, yellow, orange)',
      },
      {
        name: 'Cauliflower',
        image: 'https://pngimg.com/uploads/cabbage/cabbage_PNG8824.png', // Replace with actual path
        description: 'Cauliflower is a great source of Vitamin C, Vitamin K, folate, and fiber. It contains compounds that support the body’s detoxification process and help in reducing inflammation. Cauliflower is also a cruciferous vegetable that contains antioxidants, such as glucosinolates, which are believed to help reduce cancer risk.',
        vitamins: ['Vitamin C', 'Vitamin K', 'Folate'],
        protein: '1.9g per 100g',
        types: 'Cruciferous vegetable, White variety',
      },
      {
        name: 'Kale',
        image: KALE,
        description: 'Kale is rich in Vitamin K, Vitamin A (beta-carotene), Vitamin C, and calcium. It is a powerful antioxidant that helps in detoxifying the body and promoting healthy skin. Kale contains flavonoids that are beneficial for cardiovascular health and also supports the immune system.',
        vitamins: ['Vitamin K', 'Vitamin A', 'Vitamin C'],
        protein: '4.3g per 100g',
        types: 'Leafy green vegetable, Dark green variety',
      },
      {
        name: 'Sweet Potato',
        image: POTATO, // Replace with actual path
        description: 'Sweet potatoes are an excellent source of beta-carotene, which the body converts into Vitamin A, supporting healthy vision. They also provide Vitamin C, Vitamin B6, potassium, and fiber. Sweet potatoes help in stabilizing blood sugar levels, making them a great option for people with diabetes.',
        vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin B6'],
        protein: '1.6g per 100g',
        types: 'Root vegetable, Orange variety',
      },
      
    ];
    

      const [currentVeggie, setCurrentVeggie] = useState(0);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentVeggie((prev) => (prev + 1) % vegetables.length); // Change vegetable every 10 seconds
        }, 10000); // 10 seconds interval
    
        return () => clearInterval(intervalId); // Clean up the interval when component unmounts
      });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
        // Here you can handle the form submission, like sending data to an API
    };

    return (
        <>
        <div className="vegetables-page">
      {/* Vegetable Information Section */}
      <Container className="text-white">
        <h1 className="text-center mb-4 mt-5 page-title">Vegetables Information</h1>
        <Row className="vegetable-info p-4 mb-4 info-section">
          <Col xs={12} md={6}>
            <h3 className="section-title ">{vegetables[currentVeggie].name}</h3>
            <p className="info-text">{vegetables[currentVeggie].description}</p>
            <h5>Vitamins:</h5>
            <ul>
              {vegetables[currentVeggie].vitamins.map((vitamin, index) => (
                <li key={index} className="info-text">{vitamin}</li>
              ))}
            </ul>
            <h5>Protein Content:</h5>
            <p className="info-text">{vegetables[currentVeggie].protein}</p>
            <h5>Type:</h5>
            <p className="info-text">{vegetables[currentVeggie].types}</p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              className="vegetable-image"
              src={vegetables[currentVeggie].image}
              alt={vegetables[currentVeggie].name}
              
            />
          </Col>
        </Row>
      </Container>

      {/* Contact Section */}
      <div
        className="contact-section text-white"
        style={{
          backgroundColor: '#2B4F61',
          padding: '50px 0',
        }}
      >
        <Container>
          <h3 className="text-center mb-4 section-title">Contact Us</h3>
          <Form onSubmit={handleSubmit} className="contact-form p-4">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="danger" type="submit" block>
              Submit
            </Button>
          </Form>   
        </Container>
      </div> 
    </div>

    <div className='FooterHome'> <Footer/> </div>

   
        </>
    );
};

export default Home;
