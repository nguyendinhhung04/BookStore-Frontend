import React, {useEffect, useState,useRef} from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

import { useParams,useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import {useSelector} from "react-redux";


export function UserDetail() {
    const [enabledModify, setEnabledModify] = React.useState(false);
    const [hovered, setHovered] = useState(false);
    const [Alertvisible, setAlertVisible] = useState(false);
    const params = useParams();
    const discardData = useRef(null);
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = React.useState("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
    const fileInputRef = useRef(null);
    const [inputImg, setInputImg] = React.useState(null);
    const discardImageRef = useRef(null);
    const role = useSelector((state) => state.auth.role);

    AlertConfirm.config({
        maskClosable: true,
        closeAfter: () => {
            console.log("close");
        },
    });

    const handleImageClick = () => {
        if (enabledModify){
            fileInputRef.current.click();
        }
    };

    const [user,setUser] = React.useState( {
        id : params.userId,
        email: "",
        username: "",
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
        const formData = new FormData();
        formData.append("imgData", inputImg);
        formData.append("userData", new Blob(
            [JSON.stringify(user)],
            { type: "application/json" }
        ));
        axios.post("http://localhost:8080/customer/edit", formData)
            .then(function (response) {
                discardData.current = user;
                discardImageRef.current = imgSrc;
                setEnabledModify(false);
            })
            .catch(error => {console.log(error)});
    }

    const handleDiscarded = (event) => {
        setUser(discardData.current);
        setImgSrc(discardImageRef.current);
        setEnabledModify(false);
    }

    const handleDelete = (event) => {
        axios.post(`http://localhost:8080/admin/customer/delete/${user.id}`)
            .then(response => {navigate("/admin/user/view/")})
            .catch(error => {console.log(error)});
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInputImg(file); //use useState để lưu ảnh để gửi cho backend riêng với useState ảnh hiển thị  để tránh việc gửi bằng reader.result sẽ khiến request quá kích thước
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgSrc(reader.result); // hiển thị ảnh mới
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/customer/detail/${params.userId}`)
            .then(response => {

                console.log(response.data);

                setImgSrc(`data:${response.data.imageType};base64,${response.data.data }`)

                setUser({
                    id : params.userId,
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                    fullname: response.data.fullname,
                    age: response.data.age,
                    gender : response.data.gender,
                    phone:response.data.phone,
                    address: response.data.address,
                })
                discardData.current = user;
                discardImageRef.current = imgSrc;
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [params.userId]);


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

            {/*<Row className="text-center mb-3">*/}
            {/*    <Col>*/}
            {/*        <Image*/}
            {/*            src={imgSrc}*/}
            {/*            roundedCircle*/}
            {/*            className="border"*/}
            {/*            style={{*/}
            {/*                width : "150px",*/}
            {/*                height : "150px",*/}
            {/*                borderRadius: "50%",*/}
            {/*                transform: hovered ? 'scale(1.1)' : 'scale(1)',*/}
            {/*                transition: 'transform 0.3s ease',*/}
            {/*                cursor: 'pointer'*/}
            {/*            }}*/}
            {/*            onMouseEnter={() => setHovered(true && enabledModify)}*/}
            {/*            onMouseLeave={() => setHovered(false && enabledModify)}*/}
            {/*            onClick={handleImageClick}*/}
            {/*        />*/}
            {/*        <input*/}
            {/*            type="file"*/}
            {/*            accept="image/*"*/}
            {/*            ref={fileInputRef}*/}
            {/*            style={{ display: 'none' }}*/}
            {/*            onChange={handleFileChange}*/}
            {/*        />*/}
            {/*        <h5 className="mt-2">Email: {user.email}</h5>*/}
            {/*        <p>ID: {params.userId}</p>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

            <Form >

                <Row>
                    <Col>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập username"
                            disabled={true}
                            name = "username"
                            value = {user.username}
                        />
                    </Col>

                    <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập username"
                            disabled={!enabledModify}
                            name = "fullname"
                            value = {user.password}
                            onChange={handleChanged}
                        />
                    </Col>
                </Row>

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

