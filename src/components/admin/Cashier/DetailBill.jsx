import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useSelector} from "react-redux";

export function DetailBill() {

    const [billData, setBillData] = useState({});
    const {billId} = useParams(); // Assuming you have a route like /admin/bill/:billId
    const token = useSelector((state) => state.auth.token);


    useEffect( ()=>{

        axios.get(`http://localhost:8080/admin/resource/bill/${billId}`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
            .then( res => {console.log(res.data);setBillData(res.data);})
            .catch( err => console.log(err));

    }, [] )



    return (


        <Container className="py-4">
            <h2 className="text-center mb-4">Chi Tiết Hóa Đơn</h2>

            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Thông Tin Khách Hàng</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Họ tên:</strong> {billData.customer?.fullname}</p>
                                    <p><strong>Email:</strong> {billData.customer?.email}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Số điện thoại:</strong> {billData.customer?.phone}</p>
                                    <p><strong>Địa chỉ:</strong> {billData.customer?.address}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Thông Tin Hóa Đơn</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Mã hóa đơn:</strong> {billData.id}</p>
                                    <p><strong>Ngày tạo:</strong> {billData.create_date}</p>
                                    <p><strong>Ngày thanh toán:</strong> {billData.payment_date ? billData.payment_date : "Chưa thanh toán"}</p>

                                </Col>
                                <Col md={6}>
                                    <p><strong>Tổng tiền:</strong> ..... VNĐ</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card>
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Danh Sách Sách</h5>
                </Card.Header>
                <Card.Body>
                    <Table responsive bordered hover>
                        <thead className="bg-light">
                            <tr>
                                <th>STT</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Naruto</td>
                            <td>....</td>
                            <td>100</td>
                            <td>100 VNĐ</td>
                            <td>100 VNĐ</td>
                        </tr>
                            <tr className="fw-bold">
                                <td colSpan="5" className="text-end">Tổng cộng:</td>
                                <td>100 VNĐ</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
