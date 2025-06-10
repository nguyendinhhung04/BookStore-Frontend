import {AnnouncementSlider} from "./AnnouncementSlider";
import { useNavigate } from "react-router-dom";

import "./client.css";
import {useState, useEffect} from "react";



export function Home() {
    const navigate = useNavigate();
    const [booksx, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:8080/admin/resource/book/onSale');
            const data = await response.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);


    return (
        <div className="container__home">
            <div className="container__home--slider">
                <AnnouncementSlider/>
            </div>
            <div className="container__home--book">
                <h2 className="container__home--book-title">Sách mới</h2>
                <div className="container__home--list">
                    {booksx.slice(0, 8).map((book) => (

                        <div
                            className="container__home--item"
                            key={book.id}
                            onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
                            style={{ cursor: "pointer" }}
                        >
                            <img className="container__home--item-image" src={`data:${book.coverImage.imageType};base64,${book.coverImage.data}` || "https://bizweb.dktcdn.net/100/363/455/products/con-duong-tinh-thuc-01.jpg?v=1744625216473"} alt={book.book_name} />
                            <h3 className="container__home--item-title">{book.book_name}</h3>
                            {book.discount && book.discount > 0 ? (
                                <>
                                    <p className="container__home--item-price" style={{ color: 'red', fontWeight: 'bold' }}>
                                        {Math.round(book.price * (1 - book.discount / 100))}.000 VNĐ
                                    </p>
                                    <p className="container__home--item-price" style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.95em' }}>
                                        {book.price}.000 VNĐ
                                    </p>
                                </>
                            ) : (
                                <p className="container__home--item-price">{book.price}.000 VNĐ</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer">
                <div className="footer__content">
                    <p>© 2025 BookStore. All rights reserved.</p>
                    <div className="footer__links">
                        <a href="#home">Trang chủ</a>
                        <a href="#books">Sách</a>
                        <a href="#contact">Liên hệ</a>
                        <a href="#about">Giới thiệu</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

