import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

export function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        // Fake data for demonstration
        const fakeBook = {
            id,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publisher: 'Scribner',
            category: 'Classic',
            isbn: '9780743273565',
            description: 'A novel set in the Roaring Twenties, telling the story of Jay Gatsby and his unrequited love for Daisy Buchanan.',
            coverUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        };
        setBook(fakeBook);
        setForm(fakeBook);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setBook(form);
        setEditMode(false);
        // Here you would send the updated data to the backend
    };

    if (!book) {
        return <div>No book selected.</div>;
    }
    return (
        <Row className="justify-content-center mt-4">
            <Col md={8}>
                <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                    <Row>
                        <Col md={4} className="d-flex align-items-center justify-content-center">
                            <img
                                src={form.coverUrl || 'https://via.placeholder.com/150'}
                                alt={form.title}
                                className="img-fluid rounded shadow-sm"
                                style={{ width: '100%', maxWidth: 200, height: 'auto', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col md={8}>
                            <Card.Body>
                                {editMode ? (
                                    <Form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                                        <Form.Group className="mb-3" controlId="formTitle">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control name="title" value={form.title} onChange={handleChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formAuthor">
                                            <Form.Label>Author</Form.Label>
                                            <Form.Control name="author" value={form.author} onChange={handleChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formPublisher">
                                            <Form.Label>Publisher</Form.Label>
                                            <Form.Control name="publisher" value={form.publisher} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCategory">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control name="category" value={form.category} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formISBN">
                                            <Form.Label>Code</Form.Label>
                                            <Form.Control name="isbn" value={form.isbn} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCoverUrl">
                                            <Form.Label>Cover URL</Form.Label>
                                            <Form.Control name="coverUrl" value={form.coverUrl} onChange={handleChange} />
                                        </Form.Group>
                                        <div className="d-flex gap-2 mt-3">
                                            <Button variant="primary" type="submit">Save</Button>
                                            <Button variant="secondary" type="button" onClick={() => { setEditMode(false); setForm(book); }}>Cancel</Button>
                                        </div>
                                    </Form>
                                ) : (
                                    <>
                                        <Card.Title as="h2" className="mb-3">{book.title}</Card.Title>
                                        <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                                        <Card.Text><strong>Publisher:</strong> {book.publisher}</Card.Text>
                                        <Card.Text><strong>Category:</strong> {book.category}</Card.Text>
                                        <Card.Text><strong>ISBN:</strong> {book.isbn}</Card.Text>
                                        <Card.Text><strong>Description:</strong> {book.description}</Card.Text>
                                        <Button variant="primary" className="mt-2" onClick={() => setEditMode(true)}>Edit</Button>
                                    </>
                                )}
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

