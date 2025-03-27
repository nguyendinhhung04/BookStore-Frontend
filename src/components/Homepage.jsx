import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    HouseFill,
    Box,
    PersonFill,
    BagFill,
    GearFill
} from 'react-bootstrap-icons';

export function Homepage() {
    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex">
                {/* Sidebar */}
                <Col xs={2} className="bg-gradient p-0"
                     style={{
                         background: 'linear-gradient(to bottom, #4CAF50, #45a049)',
                         minHeight: '100vh'
                     }}
                >
                    <div className="p-3 text-center text-black">
                        <h3>ShopMe</h3>
                    </div>
                    <Nav className="flex-column">



                        <Nav.Link className="text-black py-2 px-3" to="/admin/home">
                            <HouseFill className="me-2" /> Home
                        </Nav.Link>
                        <Nav.Link className="text-black py-2 px-3" to="/admin/useer">
                            <Box className="me-2" /> User
                        </Nav.Link>


                    </Nav>
                </Col>

                {/* Main Content */}
                <Col xs={10} className="bg-light p-4">
                    {/* Header */}
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h2>Welcome back, Nigger 🌚</h2>
                        </Col>
                        <Col className="text-end">
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'pink',
                                    display: 'inline-block'
                                }}
                            ></div>
                        </Col>
                    </Row>

                    {/* Dashboard Cards */}
                    <Row className = "bg-primary">
                        <Col md={4} className="mb-3 bg-warning">
                            <p>Hello </p>
                        </Col>

                        <Col md={4} className="mb-3 bg-danger">
                            <p>hi</p>
                        </Col>

                        <Col md={4} className="mb-3 bg-success">
                            <p>bôngur</p>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </>
    )
}