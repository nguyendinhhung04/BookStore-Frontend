import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export function CreateAuthor() {

    const [form, setForm] = useState({
        id: 1,
        name: "Jane Austen",
        introduction: "English novelist known for her six major novels, including Pride and Prejudice.",
        age: 41
    })

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add Author</Card.Title>
                            <Form onSubmit={}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={form.name}
                                        onChange={}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Introduction</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="introduction"
                                        value={form.introduction}
                                        onChange={}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={form.age}
                                        onChange={}
                                        required
                                        min={0}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary">Create Author</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}