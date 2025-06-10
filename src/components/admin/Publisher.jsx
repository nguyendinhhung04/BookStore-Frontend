import React, {useEffect, useState} from "react";
import {FilterMatchMode} from "primereact/api";
import axios from "axios";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {Column as PrimeColumn} from "primereact/column";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Publisher() {
    const [publisherList, setPublisherList] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [newPublisher, setNewPublisher] = useState({
        id : null,
        name : ""
    });

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const handleAddPublisher = () => {
        axios.post("http://localhost:8080/admin/resource/publisher/create", newPublisher)
            .then((res) => {console.log(res.data)})
            .catch((err) => console.log(err));
    }



    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/publisher/all")
            .then(res => {setPublisherList(res.data);console.log(res.data);})
            .catch(err => console.log(err));
    },[])

    return (
        <>
            <div className="text-end mb-2">
                <Button className="btn-primary" onClick={() => setShowInput(!showInput)}>Create Publisher</Button>
            </div>
            {showInput && (
                <div className="d-flex mb-3 align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Enter publisher name"
                        value={newPublisher.name}
                        onChange={e => setNewPublisher({ ...newPublisher, name: e.target.value })}
                        style={{ maxWidth: 300 }}
                    />
                    <Button className="btn-success" onClick={(e) => {handleAddPublisher()}}>Add</Button>
                </div>
            )}

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

