import {Col, Container, Nav, Row} from "react-bootstrap";
import {Box, HouseFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";


export function Sidebar() {
    return (
        <>

            <div className="p-3 text-center text-black">
                <h3>ShopMe</h3>
            </div>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin" className="text-black py-2 px-3">
                    <HouseFill className="me-2" /> Home
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/user/view" className="text-black py-2 px-3">
                    <Box className="me-2" /> Customer
                </Nav.Link>
            </Nav>
        </>
    )
}