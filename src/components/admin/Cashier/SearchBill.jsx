import {Column as PrimeColumn} from "primereact/column";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import React, {useState} from "react";
import {FilterMatchMode} from "primereact/api";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export function SearchBill() {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        customerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        paymentDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        totalAmount: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    // Fake data for billList
    const billList = [
        {
            id: 1,
            customerName: 'Nguyen Dinh Hung',
            paymentDate: '2025-06-01',
            totalAmount: 150000
        },
        {
            id: 2,
            customerName: 'Tran Thi B',
            paymentDate: '2025-06-02',
            totalAmount: 200000
        },
        {
            id: 3,
            customerName: 'Le Van C',
            paymentDate: '2025-06-02',
            totalAmount: 175000
        },
        {
            id: 4,
            customerName: 'Pham Thi D',
            paymentDate: '2025-06-01',
            totalAmount: 220000
        },
        {
            id: 5,
            customerName: 'Hoang Van E',
            paymentDate: '2025-05-31',
            totalAmount: 95000
        },
        {
            id: 6,
            customerName: 'Do Thi F',
            paymentDate: '2025-05-30',
            totalAmount: 300000
        }
    ];

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
                <PrimeColumn field="customerName" header="Customer Name" filter style={{  textAlign: "left" }} />
                <PrimeColumn field="paymentDate" header="Payment Date" filter style={{  textAlign: "left" }} />
                <PrimeColumn field="totalAmount" header="Total Amount"  style={{  textAlign: "left" }} />
                <PrimeColumn
                    header="Action"
                    body={rowData => (
                        <>
                            <Button
                                as={Link}
                                to={`/admin/cashier/bill/`}
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
