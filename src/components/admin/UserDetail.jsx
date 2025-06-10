import React, {useEffect, useState,useRef} from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

import { useParams,useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import "react-alert-confirm/lib/style.css";
import {useSelector} from "react-redux";


export function UserDetail() {
    const [enabledModify, setEnabledModify] = React.useState(false);
    const params = useParams();
    const discardData = useRef(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const role = useSelector((state) => state.auth.role);

    const [user,setUser] = React.useState( {
        id : params.userId,
        email: "",
        fullname: "",
        age: -1,
        gender : "",
        phone:"",
        address: ""
    });

    const handleChanged = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleSubmited = (event) => {
        axios.post(`http://localhost:8080/user/create`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {setEnabledModify(false); discardData.current = user;})
            .catch((err) => {console.log(err)});
    }

    const handleDiscarded = (event) => {
        setUser(discardData.current);
        setEnabledModify(false);
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/admin/customer/detail/${params.userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {

                console.log(response.data);

                setUser({
                    id : params.userId,
                    email: response.data.email,
                    fullname: response.data.fullname,
                    age: response.data.age,
                    gender : response.data.gender,
                    phone:response.data.phone,
                    address: response.data.address,
                })
                discardData.current = {
                    id : params.userId,
                    email: response.data.email,
                    fullname: response.data.fullname,
                    age: response.data.age,
                    gender : response.data.gender,
                    phone:response.data.phone,
                    address: response.data.address,
                };
                console.log("Discard data:", discardData.current);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [params.userId]);


    if( role !== "ROLE_CASHIER") {
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
                            disabled={!enabledModify}
                            name = "fullname"
                            value = {user.fullname}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Tuổi</Form.Label>
                        <Form.Control
                            placeholder="Nhập tuổi"
                            disabled={!enabledModify}
                            name = "age"
                            value = {user.age}
                            onChange={handleChanged}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            disabled={!enabledModify}
                            name="gender"
                            value = {user.gender}
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
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            disabled={!enabledModify}
                            name = "phone"
                            value = {user.phone}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            disabled={!enabledModify}
                            name = "email"
                            value = {user.email}
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
                            disabled={!enabledModify}
                            name = "address"
                            value = {user.address}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>


                <div className="text-center" style={{ display: enabledModify === true ? "block" : "none" }}>
                    <Button className="btn-secondary me-2" onClick={handleDiscarded}>Discard</Button>
                    <Button className="btn-primary me-2" variant="primary" onClick={ ()=> { handleSubmited(); }} >Save</Button>
                </div>
                <div className="text-end" style={{ display: enabledModify === false ? "block" : "none" }}>

                    <Button variant="primary" className="btn-warning me-2" onClick={ ()=> {setEnabledModify(true)} }>Modify</Button>
                </div>

            </Form>
        </Container>
    );
}

