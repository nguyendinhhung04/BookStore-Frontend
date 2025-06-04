import React, {useState,useEffect} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Column as PrimeColumn} from "primereact/column";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";



export function User() {

    const [userList, setUserList] = useState([]);
    const [activeRow, setActiveRow] = useState(-1);
    const role = useSelector((state) => state.auth.role);
    const token = useSelector((state) => state.auth.token);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fullname: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        phone: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        axios.get("http://localhost:8080/admin/customer/view" , {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => setUserList(response.data))
            .catch(error => console.error("Error fetching data:", error));

    }, []);

    if( role !== "ROLE_CASHIER") {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
    }

    return (
        <>
            <div className="text-end">
                <Button as={Link} to="/admin/customer/create" className="btn-primary" > Create User</Button>
            </div>
            <div>
                {/*<Table className="table table-hover">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>ID</th>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>Action</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}

                {/*    <tbody>*/}
                {/*    {userList.map(user => (*/}
                {/*        <tr*/}
                {/*            key={user.id}*/}
                {/*            onMouseEnter={() => setActiveRow(user.id)}*/}
                {/*            onMouseLeave={() => setActiveRow(null)}*/}
                {/*        >*/}
                {/*            <td className="text-truncate" style={{ maxWidth: "150px" }}>*/}
                {/*                {user.id}*/}
                {/*            </td>*/}
                {/*            <td className="text-truncate" style={{ maxWidth: "150px" }}>*/}
                {/*                {user.fullname}*/}
                {/*            </td>*/}
                {/*            <td  style={{ maxWidth: "10px" }}>*/}
                {/*                <Button as={Link} to={`/admin/customer/detail/${activeRow}`}*/}
                {/*                        className="btn btn-primary w-auto"*/}
                {/*                        style={{ display: activeRow === user.id ? "block" : "none" }}*/}
                {/*                >*/}
                {/*                    Detail*/}
                {/*                </Button>*/}
                {/*                <Button as={Link} to={`/admin/cashier/create/${activeRow}`}*/}
                {/*                        className="btn btn-primary w-auto"*/}
                {/*                        style={{ display: activeRow === user.id ? "block" : "none" }}*/}
                {/*                >*/}
                {/*                    Payment*/}
                {/*                </Button>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*    </tbody>*/}
                {/*</Table>*/}

                <PrimeDataTable
                    value={userList}
                    paginator
                    rows={5}
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    globalFilterFields={['id', 'fullname', 'phone', 'email']}
                    tableStyle={{ minWidth: '50rem' }}
                    onFilter={(e) => setFilters(e.filters)}
                >
                    <PrimeColumn field="fullname" header="Full Name" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="email" header="Email" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="phone" header="Phone" filter style={{  textAlign: "left" }} />
                    <PrimeColumn
                        header="Action"
                        body={rowData => (
                            <>
                                <Button
                                    as={Link}
                                    to={`/admin/customer/detail/${rowData.id}`}
                                    className="btn btn-primary w-auto"
                                    size="sm"
                                    style={{ marginRight: "4px" }}
                                >
                                    Detail
                                </Button>
                                <Button
                                    as={Link}
                                    to={`/admin/cashier/create/${rowData.id}`}
                                    className="btn btn-primary w-auto"
                                    size="sm"
                                >
                                    Payment
                                </Button>
                            </>
                        )}
                    />
                </PrimeDataTable>


            </div>
        </>
    )
}