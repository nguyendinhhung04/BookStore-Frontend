import React from 'react';
import {useState, useRef} from "react";
import {Col, Container, Form, Image, Row,Button} from "react-bootstrap";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

 function CreateUser()
{
    const [userInput, setUserInput] = useState({
        id : null,
        fullname: "",
        age: 0,
        gender: "",
        address: "",
        email: "",
        phone: "",
    });
    const role = useSelector((state) => state.auth.role);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();



    const handleChanged = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInput(values => ({ ...values, [name]: value }));
    }

    const handleSubmited = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/user/create`, userInput, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {console.log(response.data); navigate('/admin/customer/view');})
            .catch(error => console.error("There was an error creating the user!", error));
    }

    if( role !== "ROLE_ADMIN" && role !== "ROLE_CASHIER" ) {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
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
                            type="number"
                            placeholder="Nhập tuổi"
                            name = "age"
                            value = {userInput.age}
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
