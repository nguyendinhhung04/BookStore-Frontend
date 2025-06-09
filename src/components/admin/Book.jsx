import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Column as PrimeColumn} from "primereact/column";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Dropdown} from "primereact/dropdown";

export function Book() {
    const [bookList, setBookList] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [allAuthor, setAllAuthor] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/book/all")
            .then(res => {console.log(res.data);setBookList(res.data);console.log(bookList);})
            .catch(err => console.log(err));
    }, []);



    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        book_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        code: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        language: { value: null, matchMode: FilterMatchMode.CONTAINS },
        onSale: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const onSaleOptions = [
        { label: "All", value: null },
        { label: "Yes", value: true },
        { label: "No", value: false }
    ];

    const onSaleFilterTemplate = (options) => (
        <Dropdown
            value={options.value}
            options={onSaleOptions}
            onChange={e => options.filterApplyCallback(e.value)}
            placeholder="All"
            style={{ minWidth: '6rem' }}
        />
    );

    return (
        <>
            <div className="text-end">
                <Button as={Link} to="/admin/resource/book/create" className="btn-primary" > Create Book</Button>
            </div>
            <div style={{
                paddingTop: "20px",
            }}>


                <PrimeDataTable
                    value={bookList}
                    paginator
                    rows={5}
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    globalFilterFields={['id', 'book_name', 'language']}
                    tableStyle={{ minWidth: '50rem' }}
                    onFilter={(e) => setFilters(e.filters)}
                >
                    <PrimeColumn field="book_name" header="Name" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="code" header="Code" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="category" header="Category" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="language" header="Language" filter style={{  textAlign: "left" }} />
                    <PrimeColumn
                        field="onSale"
                        header="On Sale"
                        filter
                        filterElement={onSaleFilterTemplate}
                        body={rowData => rowData.onSale ? "Yes" : "No"}
                        style={{ textAlign: "center" }}
                    />
                    <PrimeColumn
                        header="Action"
                        body={rowData => (
                            <>
                                <Button
                                    as={Link}
                                    to={`/admin/resource/book/${rowData.id}`}
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

            </div>
        </>
    )
}