import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Staff() {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = () => {
        axios.get("http://localhost:8080/staff/all")
            .then(response => {
                setStaffList(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi tải danh sách nhân viên:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nhân viên này không?")) {
            axios.delete(`http://localhost:8080/staff/delete/${id}`)
                .then(() => {
                    fetchStaff(); // reload danh sách sau khi xoá
                })
                .catch(error => {
                    console.error("Lỗi khi xoá nhân viên:", error);
                });
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Danh sách Nhân viên</h4>
                <Button as={Link} to="/admin/staff/create" variant="success">+ Thêm Nhân viên</Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff, index) => (
                        <tr key={staff.id}>
                            <td>{index + 1}</td>
                            <td>{staff.fullname}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phone}</td>
                            <td>{staff.age}</td>
                            <td>{staff.gender}</td>
                            <td>
                                <Button
                                    as={Link}
                                    to={`/admin/staff/detail/${staff.id}`}
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                >Xem</Button>

                                <Button
                                    as={Link}
                                    to={`/admin/staff/edit/${staff.id}`}
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                >Sửa</Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(staff.id)}
                                >Xoá</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Staff;
