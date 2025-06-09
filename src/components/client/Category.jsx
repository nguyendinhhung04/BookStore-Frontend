
import { useNavigate } from "react-router-dom";

import "./client.css";
import {useEffect, useState} from "react";



export function Category() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("ROMANCE");
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:8080/admin/resource/book/onSale');
            const data = await response.json();
            setBooks(data);
            setFilteredBooks(data.filter(book => book.category === category));
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        setFilteredBooks(books.filter(book => book.category === category));
    }, [category]);

    return (
        <div className="container__home">
            <div className="container__home--book">
                <div className="container__home--book-category">
                    <button className={`container__home--book-category-button ${category === "ROMANCE" ? "active" : ""}`} onClick={() => setCategory("ROMANCE")}>Romance</button>
                    <button className={`container__home--book-category-button ${category === "SCIENCE" ? "active" : ""}`} onClick={() => setCategory("CHILDREN")}>Children</button>
                    <button className={`container__home--book-category-button ${category === "FICTION" ? "active" : ""}`} onClick={() => setCategory("SELF_HELP")}>Self-Help</button>
                    <button className={`container__home--book-category-button ${category === "HISTORY" ? "active" : ""}`} onClick={() => setCategory("HISTORY")}>History</button>
                </div>
                <div className="container__home--list">
                    {filteredBooks?.map((book) => (
                        <div
                            className="container__home--item"
                            key={book.id}
                            onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
                            style={{ cursor: "pointer" }}
                        >
                            <img className="container__home--item-image" src={`data:${book.coverImage.imageType};base64,${book.coverImage.data}` || "https://bizweb.dktcdn.net/100/363/455/products/con-duong-tinh-thuc-01.jpg?v=1744625216473"} alt={book.book_name} />
                            <h3 className="container__home--item-title">{book.book_name}</h3>
                            <p className="container__home--item-price">{book.price}.000 VNĐ</p>
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