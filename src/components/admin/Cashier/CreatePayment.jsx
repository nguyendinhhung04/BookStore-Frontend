import {Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export function CreatePayment() {

    const [customer,setCustomer] = useState({});
    const params = useParams();
    const token = useSelector((state) => state.auth.token);
    const [bookList, setBookList] = useState([]);
    const [displayBookList, setDisplayBookList] = useState([]);
    const [bookCode, setBookCode] = useState('');
    const [bookQuantity, setBookQuantity] = useState(1);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [isPaid, setIsPaid] = useState(false);

    const onAddBook = () => {
        if (displayBookList.some(book => book.code === bookCode)) {
            // Find the book in displayBookList to get its code and id
            const displayBook = displayBookList.find(book => book.code === bookCode);
            setDisplayBookList(prevList => prevList.map(book =>
                book.code === bookCode
                    ? { ...book, quantity: book.quantity + Number(bookQuantity) }
                    : book
            ));
            // Update bookList by matching code (store code in bookList for easier matching)
            setBookList(prevList => prevList.map(book =>
                book.code === bookCode
                    ? { ...book, quantity: book.quantity + Number(bookQuantity) }
                    : book
            ));
            return;
        }
        axios.get(`http://localhost:8080/admin/resource/book/code/${bookCode}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDisplayBookList( prevList => [...prevList, {"book_name" : response.data.book_name, "code": response.data.code, "price" : response.data.price, "quantity" :Number(bookQuantity) }]);
                // Store code in bookList for easier matching
                setBookList( prevList => [...prevList, {"bookId" : response.data.id, "code": response.data.code, "price" : response.data.price, "quantity": Number(bookQuantity)}]);
            })
            .catch(error => console.log(error));
    }

    const handleCheckboxChange = (code) => {
        setSelectedBooks(prev =>
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
        );
    };

    const handleDeleteBooks = () => {
        setDisplayBookList(prev => prev.filter(book => !selectedBooks.includes(book.code)));
        setBookList(prev => prev.filter(book => !selectedBooks.includes(book.bookId)));
        setSelectedBooks([]);
    };

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

    const onConfirmPayment = async (e) => {
        e.preventDefault();
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        const payload = {
            id: null,
            create_date: dateStr,
            payment_date: isPaid ? dateStr : null,
            customer_id: customer.id,
            billDetails: bookList
        };
        try {
            await axios.post('http://localhost:8080/admin/resource/bill/confirm', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Payment created successfully!');
        } catch (err) {
            alert('Error creating payment!');
        }
    };

    const handleQuantityChange = (code, quantity) => {
        setDisplayBookList(prevList => prevList.map(book =>
            book.code === code
                ? { ...book, quantity: Number(quantity) }
                : book
        ));
        setBookList(prevList => prevList.map(book =>
            book.bookId === code || book.code === code
                ? { ...book, quantity: Number(quantity) }
                : book
        ));
    };

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
                                           type="number"
                                           placeholder="Enter book code"
                                           className="w-25"
                                           onChange={(e) => setBookCode(e.target.value)}
                                       />

                                       <Form.Control
                                           type="number"
                                           placeholder="Enter quantity"
                                           className="w-25"
                                           onChange={(e) => setBookQuantity(e.target.value)}
                                       />

                                       <button type="button" className="btn btn-primary mb-2" onClick={(e) => {onAddBook()}}>Add</button>
                                       <button type="button" className="btn btn-danger mb-2" onClick={handleDeleteBooks}>Delete</button>
                                   </div>
                                   <Form.Group controlId="formCheckboxTable">
                                       <div className="p-3 rounded border bg-light shadow-sm position-relative">
                                           <table className="table table-bordered align-middle mb-0">
                                               <thead className="table-light">
                                                   <tr>
                                                       <th style={{width: '50px'}}></th>
                                                       <th>Code</th>
                                                       <th>Name</th>
                                                       <th>Unit price</th>
                                                       <th>Quantity</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                               { displayBookList.map( (book, index) => (
                                                    <tr key={index}>
                                                         <td>
                                                              <input type="checkbox" className="form-check-input" checked={selectedBooks.includes(book.code)} onChange={() => handleCheckboxChange(book.code)} />
                                                         </td>
                                                         <td>{book.code}</td>
                                                         <td>{book.book_name}</td>
                                                         <td>{book.price}</td>
                                                         <td>
                                                             <Form.Control
                                                                 type="number"
                                                                 min={1}
                                                                 value={book.quantity}
                                                                 onChange={e => handleQuantityChange(book.code, e.target.value)}
                                                                 style={{ width: '80px' }}
                                                             />
                                                         </td>
                                                    </tr>
                                               ))}

                                               </tbody>
                                           </table>
                                       </div>
                                   </Form.Group>
                                   <div className="form-check my-3">
                                       <input
                                           className="form-check-input"
                                           type="checkbox"
                                           id="paidCheckbox"
                                           checked={isPaid}
                                           onChange={e => setIsPaid(e.target.checked)}
                                       />
                                       <label className="form-check-label" htmlFor="paidCheckbox">
                                           Đã thanh toán
                                       </label>
                                   </div>
                                   <div className="d-flex justify-content-center">
                                       <button type="button" className="btn btn-primary mb-2" onClick={onConfirmPayment}>Confirm</button>
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

