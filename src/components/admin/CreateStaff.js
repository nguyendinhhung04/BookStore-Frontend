import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

function CreateStaff() {
    const [staffInput, setStaffInput] = useState({
        fullname: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        phone: "",
        address: ""
    });
    const role = useSelector((state) => state.auth.role);


    const handleChanged = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setStaffInput(values => ({ ...values, [name]: value }));
    }

    const handleSubmited = () => {
        axios.post("http://localhost:8080/staff/create", staffInput)
            .then(function (response) {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    if( role !== "ROLE_ADMIN") {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
    }

    return (
        <Container className="mt-4 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>
            <Form>
                <h4 className="text-center mb-4">Tạo Nhân Viên</h4>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            name="fullname"
                            value={staffInput.fullname}
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
                            name="age"
                            value={staffInput.age}
                            onChange={handleChanged}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            name="gender"
                            value={staffInput.gender}
                            onChange={handleChanged}
                        >
                            <option value="">--Chọn giới tính--</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
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
                            value={staffInput.email}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            value={staffInput.password}
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
                            name="phone"
                            value={staffInput.phone}
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
                            name="address"
                            value={staffInput.address}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <div className="text-center">
                    <Button className="btn-secondary me-2" as={Link} to="/admin/staff/view">Quay lại</Button>
                    <Button
                        className="btn-primary me-2"
                        variant="primary"
                        onClick={handleSubmited}
                        as={Link}
                        to="/admin/staff/view"
                    >Lưu</Button>
                </div>
            </Form>
        </Container>
    );
}

export default CreateStaff;
