import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useSelector} from "react-redux";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column as PrimeColumn } from 'primereact/column';



function Staff() {
    const [staffList, setStaffList] = useState([]);
    const role = useSelector((state) => state.auth.role);
    const token = useSelector((state) => state.auth.token);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fullname: { value: null, matchMode: FilterMatchMode.CONTAINS },
        role: { value: null, matchMode: FilterMatchMode.EQUALS }

    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = () => {
        axios.get("http://localhost:8080/admin/staff/view" , {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => {
                setStaffList(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi tải danh sách nhân viên:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá nhân viên này không?")) {
            axios.delete(`http://localhost:8080/admin/staff/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(() => {
                    fetchStaff(); // reload danh sách sau khi xoá
                })
                .catch(error => {
                    console.error("Lỗi khi xoá nhân viên:", error);
                });
        }
    };

    if( role !== "ROLE_ADMIN") {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Danh sách Nhân viên</h4>
                <Button as={Link} to="/admin/staff/create" variant="success">+ Thêm Nhân viên</Button>
            </div>

            <PrimeDataTable
                value={staffList}
                paginator
                rows={10}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                globalFilterFields={['fullname', 'id', 'role']}
                tableStyle={{ minWidth: '50rem' }}
                onFilter={(e) => setFilters(e.filters)}
            >
                <PrimeColumn field="id" header="ID" filter style={{ width: "150px", textAlign: "left" }} />
                <PrimeColumn field="fullname" header="Name" filter style={{  textAlign: "left" }} />
                <PrimeColumn field="role" header="Role" filter style={{  textAlign: "left" }} />

                <PrimeColumn
                    style ={{ display : "flex"}}
                    header="Action"
                    body={rowData => (
                        <>
                            <Button
                                as={Link}
                                to={`/admin/staff/detail/${rowData.id}`}
                                className="btn btn-primary w-auto"
                                size="sm"
                                style={{ marginRight: "4px" }}
                            >
                                Detail
                            </Button>
                            <Button
                                onClick={() => handleDelete(rowData.id)}
                                className="btn btn-danger w-auto"
                                size="sm"
                            >
                                Delete
                            </Button>
                        </>
                    )}
                />

            </PrimeDataTable>

        </Container>
    );
}

export default Staff;
