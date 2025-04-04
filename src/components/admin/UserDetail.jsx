import React, {useEffect, useState,useRef} from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

import { useParams,useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";

export function UserDetail() {
    const [enabledModify, setEnabledModify] = React.useState(false);
    const [Alertvisible, setAlertVisible] = useState(false);
    const params = useParams();
    const discardData = useRef(null);
    const navigate = useNavigate();

    AlertConfirm.config({
        maskClosable: true,
        closeAfter: () => {
            console.log("close");
        },
    });

    const [user,setUser] = React.useState( {
        id : params.userId,
        email: "",
        password: "",
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
        axios.post("http://localhost:8080/user/create", user)
            .then(function (response) {discardData.current = user;setEnabledModify(false);})
            .catch(error => {console.log(error)});

    }

    const handleDiscarded = (event) => {
        setUser(discardData.current);
        setEnabledModify(false);
    }

    const handleDelete = (event) => {
        axios.post(`http://localhost:8080/admin/user/delete/${user.id}`)
            .then(response => {navigate("/admin/user/view/")})
            .catch(error => {console.log(error)});
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/user/detail/${params.userId}`)
            .then(response => { setUser(response.data); discardData.current = response.data; })
            .catch(error => console.error("Error fetching data:", error));
    }, []);




    return (
        <Container className="mt-4 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>

            <AlertConfirm
                maskClosable
                title="Do you Want to delete these items?"
                desc="Some descriptions"
                visible={Alertvisible}
                okText="Yes"
                onOk={() => {
                    setAlertVisible(false);
                    handleDelete();
                }}
                cancelText="No"
                onCancel={() => setAlertVisible(false)}
            />

            <Row className="text-center mb-3">
                <Col>
                    <Image
                        src="https://via.placeholder.com/100"
                        roundedCircle
                        className="border"
                    />
                    <h5 className="mt-2">Email: {user.email}</h5>
                    <p>ID: {params.userId}</p>
                </Col>
            </Row>

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
                    <Button variant="primary" className="btn-danger me-2" onClick={()=>{setAlertVisible(true)}}>Delete</Button>
                </div>

            </Form>
        </Container>
    );
}

