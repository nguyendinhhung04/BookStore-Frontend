import React, {useEffect, useState} from "react";
import {FilterMatchMode} from "primereact/api";
import axios from "axios";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {Column as PrimeColumn} from "primereact/column";

export function Publisher() {
    const [publisherList, setPublisherList] = useState([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/publisher/all")
            .then(res => {setPublisherList(res.data);console.log(res.data);})
            .catch(err => console.log(err));
    },[])

    return (

        <>
            <PrimeDataTable
                value={publisherList}
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
            </PrimeDataTable>
        </>
    )
}