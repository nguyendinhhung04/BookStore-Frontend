import {useState,useEffect} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";


export function User() {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin/user/view")
            .then(response => setUserList(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            <Table className="table table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>

                <tbody>
                    {userList.map(user => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.fullname}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}