import AlertConfirm from "react-alert-confirm";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setToken} from "../redux/slice/authSlice";

export function Login() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            console.log("Login successful:", response.data);
            const responseData = {role: response.data.role, token: response.data.token, username: response.data.username,isAuthenticated: true };
            dispatch(setToken( responseData ));
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials');
        }
    };


    return (
        <>
            <Container className="mt-4 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>

                <Form  onSubmit={handleSubmit} >

                    <Row>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập username"
                                value={credentials.username}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    username: e.target.value
                                })}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    password: e.target.value
                                })}
                            />
                        </Col>
                    </Row>

                    <Button type="submit" className="mt-3">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}