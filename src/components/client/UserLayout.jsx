import {Col, Container, Nav, Row} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import {Home} from "./Home";


export function UserLayout() {
    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex flex-column">

                {/* Header Bar */}
                <Row className="m-0 w-100" style={{ backgroundColor: '#DDD19F', padding: '15px 0', fontFamily: 'Cormorant Garamond' }}>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Nav >

                            <Nav.Link
                                as={Link}
                                to="/books"
                                className="mx-3"
                                style={{ color: '#5D4037', fontSize: '1.1rem', fontWeight: '500' }}
                            >
                                Books
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/author"
                                className="mx-3"
                                style={{ color: '#5D4037', fontSize: '1.1rem', fontWeight: '500' }}
                            >
                                Category
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/author"
                                className="mx-3"
                                style={{ color: '#5D4037', fontSize: '1.1rem', fontWeight: '500' }}
                            >
                                Author
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/author"
                                className="mx-3"
                                style={{ color: '#5D4037', fontSize: '1.1rem', fontWeight: '500' }}
                            >
                                eBooks
                            </Nav.Link>
                        </Nav>

                    </Col>
                </Row>

                {/* Bottom border line */}
                <Row className="m-0 w-100">
                    <Col className="p-0">
                        <hr style={{ margin: 0, borderTop: '1px solid #5D4037' }} />
                    </Col>
                </Row>

                {/* Main Content */}
                <Row className="m-0 flex-grow-1 justify-content-center " style={{backgroundColor: '#F8F4E3',}}>
                    <Col className="p-0">
                        <Outlet />
                    </Col>
                </Row>
            </Container>

        </>
    )
}