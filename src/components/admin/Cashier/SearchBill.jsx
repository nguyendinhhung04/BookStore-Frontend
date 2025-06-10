import {Column as PrimeColumn} from "primereact/column";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {FilterMatchMode} from "primereact/api";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

export function SearchBill() {

    const [billList, setBillList] = useState([]);
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/bill/all", {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
            .then( res => {setBillList(res.data);console.log(res.data);})
            .catch( err => console.log(err));
    },[])

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // "customer.fullname": { value: null, matchMode: FilterMatchMode.CONTAINS },
        create_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        payment_date: { value: null, matchMode: FilterMatchMode.CONTAINS }
        // totalAmount: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });


    return (
        <>
            <PrimeDataTable
                value={billList}
                paginator
                rows={5}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                globalFilterFields={['id', 'book_name', 'language']}
                tableStyle={{ minWidth: '50rem' }}
                onFilter={(e) => setFilters(e.filters)}
            >
                <PrimeColumn field="id" header="ID" filter style={{  textAlign: "left" }} />
                <PrimeColumn
                    header="Customer Name"
                    filter
                    style={{  textAlign: "left" }}
                    body={rowData => rowData.customer?.fullname || ''}
                />
                <PrimeColumn field="payment_date" header="Payment Date" filter style={{  textAlign: "left" }} />
                <PrimeColumn field="create_date" header="Create Date" filter  style={{  textAlign: "left" }} />
                <PrimeColumn
                    header="Action"
                    body={rowData => (
                        <>
                            <Button
                                as={Link}
                                to={`/admin/resource/bill/${rowData.id}`}
                                className="btn btn-primary w-auto"
                                size="sm"
                                style={{ marginRight: "4px" }}
                            >
                                Detail
                            </Button>
                        </>
                    )}
                />
            </PrimeDataTable>
        </>
    )
}
