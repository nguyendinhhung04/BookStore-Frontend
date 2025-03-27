import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export function Homepage() {
    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex  ">
                {/* Main Content */}
                <Col className="bg-light p-4">
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