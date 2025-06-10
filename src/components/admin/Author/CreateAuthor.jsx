import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";

export function CreateAuthor() {
    const token = useSelector((state) => state.auth.token);

    const [author, setAuthor] = useState({
        id: null,
        name: "",
        age: 0,
        introduction: "",
        composes : []
    })

    const handleChange = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting author data:");
        axios.post(`http://localhost:8080/admin/resource/author/create`, author, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Author created successfully:", response.data);
                // Optionally, redirect or reset form
            })
            .catch(error => {
                console.error("There was an error creating the author!", error);
        })
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add Author</Card.Title>
                            <Form onSubmit={(e)=>{handleSubmit(e)}}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={author.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={author.age}
                                        onChange={handleChange}
                                        required
                                        min={0}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Introduction</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="introduction"
                                        value={author.introduction}
                                        onChange={handleChange}
                                        required
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

