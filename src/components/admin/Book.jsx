import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Book() {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/book/view")
            .then(res => {console.log(res.data);setBookList(res.data);})
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {/*<div className="text-end">*/}
            {/*    <Button as={Link} to="/admin/user/create" className="btn-primary" > Create User</Button>*/}
            {/*</div>*/}
            <div style={{
                paddingTop: "20px",
            }}>
                <Table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Publisher</th>
                    </tr>
                    </thead>

                    <tbody>
                    {bookList.map(book => (
                        <tr
                            key={book.id}
                        >
                            <td className="text-truncate" style={{ maxWidth: "50px" }}>
                                {book.id}
                            </td>
                            <td style={{ width: "120px", textAlign: "center", verticalAlign: "middle" }}>
                                <img
                                    src={book.cover_img}
                                    alt="cover"
                                    style={{ width: "80px", height: "auto", objectFit: "cover" }}
                                />
                            </td>
                            <td  style={{ maxWidth: "10px" }}>
                                {book.book_name}
                            </td>
                            <td  style={{ maxWidth: "10px" }}>
                                {book.category.name}
                            </td>
                            <td  style={{ maxWidth: "10px" }}>
                                {book.composes.map(compose => (<p>{compose.author.name}</p>) )}
                            </td>
                            <td  style={{ maxWidth: "10px" }}>
                                Kim Đồng
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}