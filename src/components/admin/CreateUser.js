import React from 'react';
import {useState, useRef} from "react";
import {Col, Container, Form, Image, Row,Button} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

 function CreateUser()
{
    const [hovered, setHovered] = useState(false);
    const fileInputRef = useRef(null);
    const [inputImg, setInputImg] = useState(null);
    const [imageSrc, setImageSrc] = useState("https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png");
    const [userInput, setUserInput] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        age:0,
        gender:"",
        phone: "",
        address: ""
    });

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleChanged = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInput(values => ({ ...values, [name]: value }));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInputImg(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result); // hiển thị ảnh mới
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmited = (event) => {
        axios.post("http://localhost:8080/user/create", userInput)
            .then(function (response) {console.log(response)})
            .catch(error => {console.log(error)})

        const formData = new FormData();
        formData.append("inputImg",inputImg);
        console.log(formData);
        axios.post("http://localhost:8080/user/uploadImg",formData)
            .then(function (response) {console.log(response)})
            .catch(error => {console.log(error)})
    }

    return (
        <Container className="mt-4 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>
            <Form >

                <Row className="mb-3">
                    <Col>
                        <Row>

                            <Col>
                                <div>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên"
                                        name = "username"
                                        value = {userInput.username}
                                        onChange={handleChanged}
                                    />

                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên"
                                        name = "password"
                                        value = {userInput.password}
                                        onChange={handleChanged}
                                    />

                                </div>
                            </Col>

                            <Col style={{
                                display: "flex",
                                justifyContent: "center"
                            }} >
                                <img src={imageSrc}
                                     style={{
                                         width : "150px",
                                         borderRadius: "50%",
                                         transform: hovered ? 'scale(1.1)' : 'scale(1)',
                                         transition: 'transform 0.3s ease',
                                         cursor: 'pointer'
                                    }}
                                     onMouseEnter={() => setHovered(true)}
                                     onMouseLeave={() => setHovered(false)}
                                     onClick={handleImageClick}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </Col>

                        </Row>
                    </Col>
                </Row>


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
