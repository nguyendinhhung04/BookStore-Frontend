import {Col, Container, Nav, Row} from "react-bootstrap";
import {Box, DoorOpen, HouseFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from "../redux/slice/authSlice";


export function Sidebar() {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);


    return (
        <>

            <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <div className="p-3 text-center text-black">
                        <h3>ShopMe</h3>
                    </div>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/admin" className="text-black py-2 px-3">
                            <HouseFill className="me-2" /> Home
                        </Nav.Link>

                        {role === "ROLE_ADMIN" && (
                            <Nav.Link as={Link} to="/admin/user/view" className="text-black py-2 px-3">
                                <Box className="me-2" /> Customer
                            </Nav.Link>
                        )}

                        {role === "ROLE_ADMIN" && (
                            <Nav.Link as={Link} to="/admin/staff/view" className="text-black py-2 px-3">
                                <Box className="me-2" /> Staff
                            </Nav.Link>
                        )}
                        {role === "ROLE_STORE_MANAGER" && (
                            <Nav.Link as={Link} to="/admin/resource/" className="text-black py-2 px-3">
                                <Box className="me-2" /> Resource Data
                            </Nav.Link>
                        )}
                    </Nav>
                </div>

                <div className="p-3">
                    <Nav.Link onClick={()=>{dispatch(clearToken())}} className="text-danger py-2 px-3">
                        <DoorOpen className="me-2" /> Logout
                    </Nav.Link>
                </div>
            </div>
        </>
    )
}