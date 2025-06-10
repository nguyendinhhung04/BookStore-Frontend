import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function CreateBook() {
    const token = useSelector((state) => state.auth.token);

    const fileInputRef = useRef(null);
    const [imgSrc, setImgSrc] = React.useState("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
    const [inputImg, setInputImg] = React.useState(null);
    const [authorList, setAuthorList] = useState([]);
    const [inputAuthor, setInputAuthor] = useState(0);
    const [publisherList, setPublisherList] = useState([]);
    const navigate = useNavigate();


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
            publisher_id: null,
            onSale : true,
            author_ids : []
        }
    );


    const handleAddAuthor = () => {
        if( inputBook.author_ids.includes( Number(inputAuthor)) )
        {
            return
        }

        setInputBook(prev => ({
            ...prev,
            author_ids: [...prev.author_ids, Number(inputAuthor)]
        }));
        console.log(inputAuthor);
    };

    const onhandleRemoveAuthor = (authorId) => {
        setInputBook(prev => ({
            ...prev,
            author_ids: prev.author_ids.filter(id => id !== Number(authorId))
        }));
    };

    const onhandleChoosePublisher = (e) => {
        const { name, value } = e.target;
        setInputBook(prev => ({ ...prev, [name]: Number(value) }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputBook(prev => ({ ...prev, [name]: value }));
    }

    const handleSave = (e) => {

        if (inputBook.author_ids.length === 0) {
            alert("Please add at least one author.");
            return;
        }

        const formData = new FormData();
        formData.append("bookInfo", new Blob(
            [JSON.stringify(inputBook)],
            { type: "application/json" }
        ));
        formData.append("inputImg", inputImg);
        console.log(formData);
        axios.post("http://localhost:8080/admin/resource/book/create", formData, {
            headers: {
                Authorization: `Bearer ${token}`
}
        })
            .then((response) => {console.log(response.data);})
            .catch((error) => {console.log(error)});

        navigate("/admin/resource/");

    }

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

    useEffect(() => {
        axios.get("http://localhost:8080/admin/resource/author/all")
            .then(res => {
                setAuthorList(res.data)
            })
            .catch(err => {console.log(err)})

        axios.get("http://localhost:8080/admin/resource/publisher/all")
            .then(res => {setPublisherList(res.data)})
            .catch(err => {console.log(err)})
    },[])




    return (
        <>
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Row>
                            <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
                                <Row className="text-center mb-3 w-100">
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
                                    </Col>
                                </Row>
                                <Row className="text-center w-100">
                                    <Col>
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
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control name="book_name" value={inputBook.book_name} onChange={(e) => {handleChange(e)}} required />
                                        </Form.Group>

                                        <Row>
                                            <Col>
                                                <Form.Label>Category</Form.Label>
                                                <Form.Select
                                                    name="category"
                                                    value = {inputBook.category}
                                                    onChange={(e) => {handleChange(e)}} required
                                                >
                                                    <option value={""} >Choose a category</option>
                                                    <option value={"FICTION"} >FICTION</option>
                                                    <option value={"NON_FICTION"}>NON_FICTION</option>
                                                    <option value={"SCIENCE"} >SCIENCE</option>
                                                    <option value={"TECHNOLOGY"} >TECHNOLOGY</option>
                                                    <option value={"HISTORY"} >HISTORY</option>
                                                    <option value={"BIOGRAPHY"} >BIOGRAPHY</option>
                                                    <option value={"CHILDREN"} >CHILDREN</option>
                                                    <option value={"SELF_HELP"} >SELF_HELP</option>
                                                    <option value={"ROMANCE"} >ROMANCE</option>
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Label>Language</Form.Label>
                                                <Form.Select
                                                    name="language"
                                                    value = {inputBook.language}
                                                    onChange={(e) => {handleChange(e)}} required
                                                >
                                                    <option value={""} >Choose a language</option>
                                                    <option value={"VIETNAMESE"} >VIETNAMESE</option>
                                                    <option value={"ENGLISH"}>ENGLISH</option>
                                                    <option value={"OTHER"} >OTHER</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>


                                        <Form.Group className="mb-3">
                                            <Form.Label>Author</Form.Label>
                                            <Row>
                                                <Col>
                                                    <Form.Select
                                                        name="author"
                                                        value={inputAuthor}
                                                        onChange={e => {setInputAuthor(e.target.value);  }}
                                                        required
                                                    >
                                                        <option value="">Select author</option>
                                                        {authorList.map((author) => (
                                                            <option key={author.id} value={author.id}>
                                                                {author.name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col xs="auto" className="d-flex align-items-center">
                                                    <Button onClick={(e) => {handleAddAuthor(e)}} >Add</Button>
                                                </Col>
                                            </Row>
                                            {inputBook.author_ids.map((authorId) => (
                                                <div key={authorId} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                                    <p style={{ margin: 0 }}>
                                                        {authorList.find(author => author.id == authorId)?.name || "Unknown Author"}
                                                    </p>
                                                    <Button onClick={(e) => {onhandleRemoveAuthor(authorId)}}>X</Button>
                                                </div>
                                            ))}
                                        </Form.Group>

                                        <Form.Label>Publisher</Form.Label>
                                        <Form.Select
                                            name="publisher_id"
                                            value = {inputBook.publisher_id}
                                            onChange={(e) => {onhandleChoosePublisher(e)}} required
                                        >
                                            <option value={0} >Choose a publisher</option>
                                            {publisherList.map((publisher) => (
                                                <option key={publisher.id} value={Number(publisher.id)} >{publisher.name}</option>
                                            ))}
                                        </Form.Select>

                                        <Form.Group>

                                            <Form.Label>Publish Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="publish_date"
                                                value={inputBook.publish_date}
                                                onChange={(e) => {handleChange(e)}}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Introduction</Form.Label>
                                            <Form.Control name="introduction" value={inputBook.introduction} onChange={(e) => {handleChange(e)}} required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Translator</Form.Label>
                                            <Form.Control name="translator" value={inputBook.translator} onChange={(e) => {handleChange(e)}} required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Row>
                                                <Col>
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control type="number" name="price" value={inputBook.price} onChange={(e) => {handleChange(e)}} required />
                                                </Col>
                                                {/*<Col>*/}
                                                {/*    <Form.Label>Quantity</Form.Label>*/}
                                                {/*    <Form.Control type="number" name="quantity" value={inputBook.quantity} onChange={(e) => {handleChange(e)}} required />*/}
                                                {/*</Col>*/}
                                                <Col>
                                                    <Form.Label>OnSale</Form.Label>
                                                    <Form.Check
                                                        type="switch"
                                                        label="On Sale"
                                                        name="onSale"
                                                        checked={inputBook.onSale}
                                                        onChange={e => setInputBook(prev => ({ ...prev, onSale: e.target.checked }))}
                                                        className="mt-4"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Discount</Form.Label>
                                            <Form.Control type="number" name="discount" value={inputBook.discount} onChange={(e) => {handleChange(e)}} required />
                                        </Form.Group>

                                        <div className="d-flex gap-2 mt-3">
                                            <Button variant="primary" type="submit"  >Save</Button>
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
