import {useState,useEffect} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";



export function User() {

    const [userList, setUserList] = useState([]);
    const [activeRow, setActiveRow] = useState(-1);
    const role = useSelector((state) => state.auth.role);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        axios.get("http://localhost:8080/admin/user/view" , {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(response => setUserList(response.data))
            .catch(error => console.error("Error fetching data:", error));

    }, []);

    if( role !== "ROLE_ADMIN") {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
    }

    return (
        <>
            <div className="text-end">
                <Button as={Link} to="/admin/user/create" className="btn-primary" > Create User</Button>
            </div>
            <div>
                <Table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {userList.map(user => (
                        <tr
                            key={user.id}
                            onMouseEnter={() => setActiveRow(user.id)}
                            onMouseLeave={() => setActiveRow(null)}
                        >
                            <td className="text-truncate" style={{ maxWidth: "150px" }}>
                                {user.id}
                            </td>
                            <td className="text-truncate" style={{ maxWidth: "150px" }}>
                                {user.fullname}
                            </td>
                            <td  style={{ maxWidth: "10px" }}>
                                <Button as={Link} to={`/admin/user/detail/${activeRow}`}
                                        className="btn btn-primary w-auto"
                                        style={{ display: activeRow === user.id ? "block" : "none" }}
                                >
                                    Detail
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>



            </div>
        </>
    )
}