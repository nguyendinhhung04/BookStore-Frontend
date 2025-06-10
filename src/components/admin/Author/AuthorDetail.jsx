// import {useSelector} from "react-redux";
// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
// import {useParams} from "react-router-dom";
//
// export function AuthorDetail() {
//     const token = useSelector((state) => state.auth.token);
//     const params = useParams();
//
//     const [author, setAuthor] = useState({
//         id: params.id,
//         name: "",
//         age: 0,
//         introduction: "",
//     })
//
//     useEffect(() => {
//         axios.get(`http://localhost:8080/admin/resource/author/${author.id}`)
//             .then(res => {console.log(res.data); setAuthor(res.data);})
//             .catch(err => console.log(err));
//     },[])
//
//
//     const handleChange = (e) => {
//         setAuthor({
//             ...author,
//             [e.target.name]: e.target.value
//         });
//     };
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Submitting author data:");
//         axios.post(`http://localhost:8080/admin/resource/author/create`, author, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//             .then(response => {
//                 console.log("Author created successfully:", response.data);
//                 // Optionally, redirect or reset form
//             })
//             .catch(error => {
//                 console.error("There was an error creating the author!", error);
//             })
//     }
//
//     return (
//         <Container className="mt-4">
//             <Row className="justify-content-center">
//                 <Col md={6}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Add Author</Card.Title>
//                             <Form onSubmit={(e)=>{handleSubmit(e)}}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Name</Form.Label>
//                                     <Form.Control
//                                         name="name"
//                                         value={author.name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Form.Group>
//
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Age</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="age"
//                                         value={author.age}
//                                         onChange={handleChange}
//                                         required
//                                         min={0}
//                                     />
//                                 </Form.Group>
//
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Introduction</Form.Label>
//                                     <Form.Control
//                                         as="textarea"
//                                         rows={3}
//                                         name="introduction"
//                                         value={author.introduction}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Button type="submit" variant="primary">Create Author</Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }