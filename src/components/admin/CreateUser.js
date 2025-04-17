import React from 'react';
import {useState} from "react";
import {Col, Container, Form, Image, Row,Button} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

 function CreateUser()
{

    const [userInput, setUserInput] = useState({
        fullname: "",
        email: "",
        password: "",
        age:0,
        gender:"",
        phone: "",
        address: ""
    });

    const handleChanged = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInput(values => ({ ...values, [name]: value }));
    }

    const handleSubmited = (event) => {
        axios.post("http://localhost:8080/user/create", userInput)
            .then(function (response) {console.log(response)})
            .catch(error => {console.log(error)})
    }

    return (
        <Container className="mt-4 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>
            <Form >
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            name = "fullname"
                            value = {userInput.fullname}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Tuổi</Form.Label>
                        <Form.Control
                            placeholder="Nhập tuổi"
                            name = "age"
                            // value = {userInput.age}
                            onChange={handleChanged}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            name="gender"
                            value = {userInput.gender}
                            onChange={handleChanged}
                        >
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            name="email"
                            value={userInput.email}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            name = "phone"
                            value = {userInput.phone}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Nhập địa chỉ"
                            name = "address"
                            value = {userInput.address}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>


                <div className="text-center">
                    <Button className="btn-secondary me-2"> Back </Button>
                    <Button
                        className="btn-primary me-2"
                        variant="primary"
                        onClick={handleSubmited}
                        as={Link} to='/admin/user/view'
                    >Save</Button>
                </div>
            </Form>
        </Container>
    );
}

export default CreateUser;
