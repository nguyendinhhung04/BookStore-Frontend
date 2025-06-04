import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function DetailBill() {
    const [billData, setBillData] = useState({
        customer: {
            fullname: 'Nguyen Van A',
            email: 'nguyenvana@gmail.com',
            phone: '0123456789',
            address: '123 Nguyen Van B Street, District 1, HCMC'
        },
        billInfo: {
            id: "BILL001",
            paymentDate: '2025-06-02',
            totalAmount: 450000,
            status: 'Completed'
        },
        books: [
            {
                id: 1,
                name: 'Dac Nhan Tam',
                author: 'Dale Carnegie',
                quantity: 2,
                price: 150000
            },
            {
                id: 2,
                name: 'Nha Gia Kim',
                author: 'Paulo Coelho',
                quantity: 1,
                price: 150000
            }
        ]
    });

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
                                    <p><strong>Họ tên:</strong> {billData.customer.fullname}</p>
                                    <p><strong>Email:</strong> {billData.customer.email}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Số điện thoại:</strong> {billData.customer.phone}</p>
                                    <p><strong>Địa chỉ:</strong> {billData.customer.address}</p>
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
                                    <p><strong>Mã hóa đơn:</strong> {billData.billInfo.id}</p>
                                    <p><strong>Ngày thanh toán:</strong> {billData.billInfo.paymentDate}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Tổng tiền:</strong> {billData.billInfo.totalAmount.toLocaleString('vi-VN')} VNĐ</p>
                                    <p><strong>Trạng thái:</strong> {billData.billInfo.status}</p>
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
                            {billData.books.map((book, index) => (
                                <tr key={book.id}>
                                    <td>{index + 1}</td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.price.toLocaleString('vi-VN')} VNĐ</td>
                                    <td>{(book.price * book.quantity).toLocaleString('vi-VN')} VNĐ</td>
                                </tr>
                            ))}
                            <tr className="fw-bold">
                                <td colSpan="5" className="text-end">Tổng cộng:</td>
                                <td>{billData.billInfo.totalAmount.toLocaleString('vi-VN')} VNĐ</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
