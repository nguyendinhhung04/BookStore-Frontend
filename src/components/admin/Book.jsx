import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Column as PrimeColumn} from "primereact/column";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";

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
        language: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    return (
        <>
            {/*<div className="text-end">*/}
            {/*    <Button as={Link} to="/admin/user/create" className="btn-primary" > Create User</Button>*/}
            {/*</div>*/}
            <div style={{
                paddingTop: "20px",
            }}>
                {/*<Table className="table table-hover">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>ID</th>*/}
                {/*        <th>Cover</th>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>Category</th>*/}
                {/*        <th>Author</th>*/}
                {/*        <th>Publisher</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}

                {/*    <tbody>*/}
                {/*    {bookList.map(book => (*/}
                {/*        <tr*/}
                {/*            key={book.id}*/}
                {/*        >*/}
                {/*            <td className="text-truncate" style={{ maxWidth: "50px" }}>*/}
                {/*                {book.id}*/}
                {/*            </td>*/}
                {/*            <td style={{ width: "120px", textAlign: "center", verticalAlign: "middle" }}>*/}
                {/*                <img*/}
                {/*                    src={book.cover_img}*/}
                {/*                    alt="cover"*/}
                {/*                    style={{ width: "80px", height: "auto", objectFit: "cover" }}*/}
                {/*                />*/}
                {/*            </td>*/}
                {/*            <td  style={{ maxWidth: "10px" }}>*/}
                {/*                {book.book_name}*/}
                {/*            </td>*/}
                {/*            <td  style={{ maxWidth: "10px" }}>*/}
                {/*                {book.category.name}*/}
                {/*            </td>*/}
                {/*            <td  style={{ maxWidth: "10px" }}>*/}
                {/*                {book.composes.map(compose => (<p>{compose.author.name}</p>) )}*/}
                {/*            </td>*/}
                {/*            <td  style={{ maxWidth: "10px" }}>*/}
                {/*                Kim Đồng*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*    </tbody>*/}
                {/*</Table>*/}

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
                    <PrimeColumn field="id" header="ID" filter style={{ width: "150px", textAlign: "left" }} />
                    <PrimeColumn field="book_name" header="Name" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="code" header="Code" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="category" header="Category" filter style={{  textAlign: "left" }} />
                    <PrimeColumn field="language" header="Language" filter style={{  textAlign: "left" }} />
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