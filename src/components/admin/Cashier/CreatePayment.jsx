import {Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export function CreatePayment() {

    const [customer,setCustomer] = useState({});
    const params = useParams();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        console.log(`Bearer ${token}`);
        console.log(`http://localhost:8080/admin/customer/detail/${params.id}`);
        axios.get( `http://localhost:8080/admin/customer/detail/${params.id}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCustomer(response.data); // Save customer data to state
                console.log(response.data);
                console.log(token);
            })
    },[])

    return (
        <>
            <div>
                <h1 className="text-center my-4">Tạo Thanh Toán</h1>
                <div className="d-flex justify-content-center">
                   <Container>
                       {/* Display customer info */}
                       <Row className="mb-3">
                           <Col>
                               <h5>Customer Information</h5>
                               <div>Name: {customer.fullname}</div>
                               <div>Email: {customer.email}</div>
                               <div>Phone: {customer.phone}</div>

                               {/* Add more fields as needed */}
                           </Col>
                       </Row>
                       <Row>
                           <Col>
                               <Form>
                                   <div className="d-flex justify-content-start align-items-center gap-2">
                                       <Form.Control
                                           type="text"
                                           placeholder="Enter book code"
                                           className="w-25"
                                       />
                                       <button type="button" className="btn btn-primary mb-2">Add</button>
                                       <button type="button" className="btn btn-danger mb-2">Delete</button>
                                   </div>
                                   <Form.Group controlId="formCheckboxTable">
                                       <div className="p-3 rounded border bg-light shadow-sm position-relative">
                                           <table className="table table-bordered align-middle mb-0">
                                               <thead className="table-light">
                                                   <tr>
                                                       <th style={{width: '50px'}}></th>
                                                       <th>Code</th>
                                                       <th>Name</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                                   <tr>
                                                       <td className="text-center">
                                                           <Form.Check type="checkbox" value="option1" id="option1" />
                                                       </td>
                                                       <td className="fw-semibold"> 345 </td>
                                                       <td className="fw-semibold">Dac nhan tam</td>
                                                   </tr>
                                                   <tr>
                                                       <td className="text-center">
                                                           <Form.Check type="checkbox" value="option2" id="option2" />
                                                       </td>
                                                       <td className="fw-semibold">974</td>
                                                       <td className="fw-semibold">Deep work</td>
                                                   </tr>
                                                   <tr>
                                                       <td className="text-center">
                                                           <Form.Check type="checkbox" value="option3" id="option3" />
                                                       </td>
                                                       <td className="fw-semibold" >615</td>
                                                       <td className="fw-semibold">Nha Gia Kim</td>
                                                   </tr>
                                               </tbody>
                                           </table>
                                       </div>
                                   </Form.Group>
                                   <div className="d-flex justify-content-center">
                                       <button type="button" className="btn btn-primary mb-2">Confirm</button>
                                   </div>
                               </Form>
                           </Col>
                       </Row>
                   </Container>
                </div>
            </div>
        </>
    )
}

