import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import {useSelector} from "react-redux";

function StaffDetail() {
    const [enabledModify, setEnabledModify] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const params = useParams();
    const discardData = useRef(null);
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);


    AlertConfirm.config({
        maskClosable: true,
        closeAfter: () => {
            console.log("alert closed");
        },
    });

    const [staff, setStaff] = useState({
        id: params.staffId,
        fullname: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        phone: "",
        address: ""
    });

    const handleChanged = (event) => {
        const { name, value } = event.target;
        setStaff(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmited = () => {
        axios.post(`http://localhost:8080/staff/update/${staff.id}`, staff)
            .then(() => {
                discardData.current = staff;
                setEnabledModify(false);
            })
            .catch(error => console.error(error));
    };

    const handleDiscarded = () => {
        setStaff(discardData.current);
        setEnabledModify(false);
    };

    const handleDelete = () => {
        axios.post(`http://localhost:8080/staff/delete/${staff.id}`)
            .then(() => navigate("/admin/staff/view"))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/staff/detail/${params.staffId}`)
            .then(response => {
                setStaff(response.data);
                discardData.current = response.data;
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    if( role !== "ROLE_ADMIN") {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
    }

    return (
        <Container className="mt-4 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>
            <AlertConfirm
                title="Xác nhận xóa nhân viên?"
                desc="Bạn có chắc chắn muốn xóa nhân viên này không?"
                visible={alertVisible}
                onOk={() => {
                    setAlertVisible(false);
                    handleDelete();
                }}
                onCancel={() => setAlertVisible(false)}
                okText="Xóa"
                cancelText="Hủy"
            />

            <Row className="text-center mb-3">
                <Col>
                    <Image src="https://via.placeholder.com/100" roundedCircle className="border" />
                    <h5 className="mt-2">Email: {staff.email}</h5>
                    <p>ID: {staff.id}</p>
                </Col>
            </Row>

            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullname"
                            disabled={!enabledModify}
                            value={staff.fullname}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Tuổi</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            disabled={!enabledModify}
                            value={staff.age}
                            onChange={handleChanged}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            name="gender"
                            disabled={!enabledModify}
                            value={staff.gender}
                            onChange={handleChanged}
                        >
                            <option value="">--Chọn--</option>
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
                            name="email"
                            disabled={!enabledModify}
                            value={staff.email}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            disabled={!enabledModify}
                            value={staff.password}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            disabled={!enabledModify}
                            value={staff.phone}
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
                            name="address"
                            disabled={!enabledModify}
                            value={staff.address}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

                {enabledModify ? (
                    <div className="text-center">
                        <Button className="btn-secondary me-2" onClick={handleDiscarded}>Hủy</Button>
                        <Button className="btn-primary me-2" onClick={handleSubmited}>Lưu</Button>
                    </div>
                ) : (
                    <div className="text-end">
                        <Button variant="warning" className="me-2" onClick={() => setEnabledModify(true)}>Chỉnh sửa</Button>
                        <Button variant="danger" onClick={() => setAlertVisible(true)}>Xóa</Button>
                    </div>
                )}
            </Form>
        </Container>
    );
}

export default StaffDetail;
