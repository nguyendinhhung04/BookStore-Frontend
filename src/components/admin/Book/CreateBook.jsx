import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import React, {useRef, useState} from "react";

export function CreateBook() {

    const fileInputRef = useRef(null);
    const [imgSrc, setImgSrc] = React.useState("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
    const [inputImg, setInputImg] = React.useState(null);
    const [inputBook, setInputBook] = React.useState(
        {
            book_name: "",
            age_limit: 0,
            category: "",
            code: "",
            introduction: "",
            language: "",
            discount: 0,
            price: 0,
            quantity: 0,
            translator: "",
            cover_image : null,
            publish_date : null,
            publisher: null,
            compose : {}
        }
    );

    const fakeBookForm = {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publisher: "J.B. Lippincott & Co.",
        category: "Classic",
        isbn: "9780061120084",
        description: "A novel about the serious issues of rape and racial inequality, told through the eyes of a child.",
        coverUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg"
    };

    const [form, setForm] = useState(fakeBookForm);

    const handleChange = (e) => {}

    const handleSave = (e) => {}

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInputImg(file); //use useState để lưu ảnh để gửi cho backend riêng với useState ảnh hiển thị  để tránh việc gửi bằng reader.result sẽ khiến request quá kích thước
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgSrc(reader.result); // hiển thị ảnh mới
            };
            reader.readAsDataURL(file);
        }
    };




    return (
        <>
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Row>
                            <Col md={4} className="d-flex align-items-center justify-content-center">
                                {/*<img*/}
                                {/*    src={form.coverUrl || 'https://via.placeholder.com/150'}*/}
                                {/*    alt={form.title}*/}
                                {/*    className="img-fluid rounded shadow-sm"*/}
                                {/*    style={{ width: '100%', maxWidth: 200, height: 'auto', objectFit: 'cover' }}*/}
                                {/*/>*/}

                                <Row className="text-center mb-3">
                                    <Col>
                                        <Image
                                            src={imgSrc}
                                            style={{
                                                width: '100%',
                                                maxWidth: 200,
                                                height: 'auto',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        />
                                        <Button variant="secondary" onClick={() => fileInputRef.current.click()}>
                                            Chọn ảnh
                                        </Button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />

                                    </Col>
                                </Row>



                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                                        <Form.Group className="mb-3" controlId="formTitle">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control name="book_name" value={inputBook.book_name} onChange={() => {handleChange()}} required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formTitle">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control name="book_name" value={inputBook.book_name} onChange={() => {handleChange()}} required />
                                        </Form.Group>

                                        <div className="d-flex gap-2 mt-3">
                                            <Button variant="primary" type="submit">Save</Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}