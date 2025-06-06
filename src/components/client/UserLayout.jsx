import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

export function UserLayout() {
    const location = useLocation();

    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex flex-column">

                {/* Header Bar */}
                <Row className="m-0 w-100" style={{ backgroundColor: 'white', padding: '15px 0', fontFamily: 'sans-serif' }}>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Nav>

                            <Nav.Link
                                as={Link}
                                to="/"
                                className="mx-3"
                                style={{
                                    color: location.pathname === "/" ? '#2e7d32' : '#000',
                                    fontWeight: location.pathname === "/" ? 'bold' : 'normal',
                                    borderBottom: location.pathname === "/" ? '2px solid #2e7d32' : 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                Trang chủ
                            </Nav.Link>



                            <Nav.Link
                                as={Link}
                                to="/category"
                                className="mx-3"
                                style={{
                                    color: location.pathname === "/category" ? '#2e7d32' : '#000',
                                    fontWeight: location.pathname === "/category" ? 'bold' : 'normal',
                                    borderBottom: location.pathname === "/category" ? '2px solid #2e7d32' : 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                Sách Các Loại
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/author"
                                className="mx-3"
                                style={{
                                    color: location.pathname === "/author" ? '#2e7d32' : '#000',
                                    fontWeight: location.pathname === "/author" ? 'bold' : 'normal',
                                    borderBottom: location.pathname === "/author" ? '2px solid #2e7d32' : 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                Tác giả
                            </Nav.Link>

                            {/*<Nav.Link*/}
                            {/*    as={Link}*/}
                            {/*    to="/ebooks"*/}
                            {/*    className="mx-3"*/}
                            {/*    style={{*/}
                            {/*        color: location.pathname === "/ebooks" ? '#2e7d32' : '#000',*/}
                            {/*        fontWeight: location.pathname === "/ebooks" ? 'bold' : 'normal',*/}
                            {/*        borderBottom: location.pathname === "/ebooks" ? '2px solid #2e7d32' : 'none',*/}
                            {/*        fontSize: '1rem'*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    eBooks*/}
                            {/*</Nav.Link>*/}
                        </Nav>
                    </Col>
                </Row>

                {/* Bottom border line */}
                <Row className="m-0 w-100">
                    <Col className="p-0">
                        <hr style={{ margin: 0, borderTop: '3px solid #228b22' }} />
                    </Col>
                </Row>

                {/* Main Content */}
                <Row className="m-0 flex-grow-1 justify-content-center" >
                    <Col className="p-0">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
