import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function CreateStaff() {
    const token = useSelector((state) => state.auth.token);
    const [usernameValid, setUsernameValid] = useState(true);
    const navigate = useNavigate();
    const [staff, setStaff] = useState({
        fullname: "",
        email: "",
        username : "",
        password: "",
        age: 0,
        gender: "",
        phone: "",
        role : null
    });
    const role = useSelector((state) => state.auth.role);


    const handleChanged = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setStaff(values => ({ ...values, [name]: value }));
    }

    const handleSubmited = () => {
        axios.post("http://localhost:8080/admin/staff/create", staff, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                if(response.data === true){
                    navigate("/admin/staff/view");
                }
                else{
                    setUsernameValid(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    if( role !== "ROLE_ADMIN" ) {
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
                            value={staff.fullname}
                            onChange={handleChanged}
                            required
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
                            value={staff.age}
                            onChange={handleChanged}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            name="gender"
                            value={staff.gender}
                            onChange={handleChanged}
                            required
                        >
                            <option value="">--Chọn giới tính--</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                            <option value="Other">Khác</option>
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
                            value={staff.email}
                            onChange={handleChanged}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên đăng nhập "
                            name="username"
                            value={staff.username}
                            onChange={handleChanged}
                            required
                        />
                        {usernameValid===false && (
                            <p style={{color : "red"}}>Tên người dùng đã tồn tại</p>
                        )}
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            value={staff.password}
                            onChange={handleChanged}
                            required
                        />

                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Vai trof</Form.Label>
                        <Form.Select
                            name="role"
                            value={staff.role}
                            onChange={handleChanged}
                            required
                        >
                            <option value="">--Chọn vai trò--</option>
                            <option value="ADMIN">Admin</option>
                            <option value="CASHIER">Thu ngân</option>
                            <option value="STORE_MANAGER">Quản lý cửa hàng</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            name="phone"
                            value={staff.phone}
                            onChange={handleChanged}
                            required
                        />
                    </Col>
                </Row>


                <div className="text-center">
                    <Button className="btn-secondary me-2" as={Link} to="/admin/staff/view">Quay lại</Button>
                    <Button
                        className="btn-primary me-2"
                        variant="primary"
                        onClick={handleSubmited}
                    >Lưu</Button>
                </div>
            </Form>
        </Container>
    );
}

export default CreateStaff;
