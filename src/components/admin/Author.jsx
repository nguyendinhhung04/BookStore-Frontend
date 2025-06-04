import React, {useEffect, useState} from "react";
import axios from "axios";
import {Column as PrimeColumn} from "primereact/column";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Author() {

    const [authorList, setAuthorList] = useState([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/author/all")
            .then(res => {setAuthorList(res.data);console.log(res.data);})
            .catch(err => console.log(err));
    },[])

    return (

        <>
            <PrimeDataTable
                value={authorList}
                paginator
                rows={5}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                globalFilterFields={['id', 'book_name', 'language']}
                tableStyle={{ minWidth: '50rem' }}
                onFilter={(e) => setFilters(e.filters)}
            >
                <PrimeColumn field="id" header="ID" filter style={{ width: "150px", textAlign: "left" }} />
                <PrimeColumn field="name" header="Name" filter style={{  textAlign: "left" }} />
                <PrimeColumn
                    header="Action"
                    body={rowData => (
                        <>
                            <Button
                                as={Link}
                                to={`/admin/resource/author/${rowData.id}`}
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