//import { Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import UserInput from "./components/ui/UserInput";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [userInput, setUserInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInput); // Để kiểm tra dữ liệu khi submit



    fetch('http://localhost:8080/create',
      {
        method: "POST", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          fullname: userInput.fullname,
          email: userInput.email,
          password: userInput.password,
          phone: userInput.phone,
          address: userInput.address
        })
      }
    )
      .then(response => response.json())
      .then(data => setUserInput(data))
      .catch(error => console.error('Error fetching users:', error));
  }

  return (
    <>


      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridFullName">
            <Form.Label>FullName</Form.Label>
            <Form.Control
              name='fullname'
              placeholder="Your FullName"
              value={userInput.name} onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type="email"
                placeholder="Enter email"
                value={userInput.email} onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type="password"
                placeholder="Password"
                value={userInput.password} onChange={handleChange}
              />
            </Form.Group>
          </Row>


          <Form.Group className="mb-3" controlId="formGridPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name='phone'
              placeholder="Your Phone numer"
              value={userInput.phone} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name='address'
              placeholder="1234 Main St"
              type='phone'
              value={userInput.address} onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>

    </>
  );
}


export default App;