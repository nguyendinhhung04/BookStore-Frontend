import {AnnouncementSlider} from "./AnnouncementSlider";
import { useNavigate } from "react-router-dom";

import "./client.css";
import {useState, useEffect} from "react";

const books = [
    {
        id: 1,
        book_name: "Romeo and Juliet",
        price: 150,
        age_limit: 0,
        discount: 0,
        introduction: "A timeless romantic tragedy.",
        publish_date: "2023-10-21",
        translator: "Nguyen Van D",
        author_ids: [1, 2],
        category: "ROMANCE",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: "https://bizweb.dktcdn.net/thumb/large/100/363/455/products/triet-hoc-ve-su-ham-muon-01.jpg?v=1746605425953",
        code: "483",
        quantity: 100
    },
    {
        id: 2,
        book_name: "Pride and Prejudice",
        price: 160,
        age_limit: 0,
        discount: 10,
        introduction: "A classic story of love and misunderstandings.",
        publish_date: "2023-05-15",
        translator: "Tran Thi B",
        author_ids: [3],
        category: "ROMANCE",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: "https://bizweb.dktcdn.net/thumb/large/100/363/455/products/suanuitriethoc01-8b3e5c36-50b5-4eb4-8c04-9b17c21b31c2.jpg?v=1736215302887",
        code: "221",
        quantity: 80
    },
    {
        id: 3,
        book_name: "The Notebook",
        price: 170,
        age_limit: 12,
        discount: 5,
        introduction: "A heartfelt romantic journey.",
        publish_date: "2023-02-11",
        translator: "Le Van C",
        author_ids: [4],
        category: "ROMANCE",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: "https://bizweb.dktcdn.net/thumb/large/100/363/455/products/quan-vuong-02.jpg?v=1736215261693",
        code: "578",
        quantity: 95
    },
    {
        id: 4,
        book_name: "Me Before You",
        price: 175,
        age_limit: 15,
        discount: 7,
        introduction: "A tragic love story.",
        publish_date: "2023-08-03",
        translator: "Nguyen Thi D",
        author_ids: [5],
        category: "ROMANCE",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: "https://bizweb.dktcdn.net/thumb/large/100/363/455/products/triet-hoc-cho-nguoi-dang-tri-01.jpg?v=1722825554920",
        code: "912",
        quantity: 70
    },
    {
        id: 5,
        book_name: "Love Story",
        price: 155,
        age_limit: 10,
        discount: 0,
        introduction: "A simple, powerful romance.",
        publish_date: "2023-04-18",
        translator: "Pham Van E",
        author_ids: [6],
        category: "ROMANCE",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "734",
        quantity: 90
    },
    {
        id: 6,
        book_name: "Twilight",
        price: 180,
        age_limit: 13,
        discount: 5,
        introduction: "A love story between human and vampire.",
        publish_date: "2023-11-30",
        translator: "Hoang Thi F",
        author_ids: [7],
        category: "ROMANCE",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "119",
        quantity: 100
    },
    // === SCIENCE ===
    {
        id: 7,
        book_name: "A Brief History of Time",
        price: 200,
        age_limit: 12,
        discount: 10,
        introduction: "Explore the universe with Stephen Hawking.",
        publish_date: "2022-09-10",
        translator: "Tran Van G",
        author_ids: [8],
        category: "SCIENCE",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: null,
        code: "307",
        quantity: 50
    },
    {
        id: 8,
        book_name: "The Selfish Gene",
        price: 210,
        age_limit: 15,
        discount: 5,
        introduction: "Understanding evolution from genes' perspective.",
        publish_date: "2023-03-07",
        translator: "Nguyen Thi H",
        author_ids: [9],
        category: "SCIENCE",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "684",
        quantity: 60
    },
    {
        id: 9,
        book_name: "Cosmos",
        price: 230,
        age_limit: 14,
        discount: 0,
        introduction: "A journey through space and time.",
        publish_date: "2023-06-22",
        translator: "Le Van I",
        author_ids: [10],
        category: "SCIENCE",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "456",
        quantity: 70
    },
    {
        id: 10,
        book_name: "Astrophysics for People in a Hurry",
        price: 180,
        age_limit: 13,
        discount: 5,
        introduction: "Quick lessons in astrophysics.",
        publish_date: "2023-01-30",
        translator: "Hoang Thi K",
        author_ids: [11],
        category: "SCIENCE",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: null,
        code: "234",
        quantity: 85
    },
    {
        id: 11,
        book_name: "The Gene",
        price: 220,
        age_limit: 16,
        discount: 8,
        introduction: "History and science of the gene.",
        publish_date: "2023-07-12",
        translator: "Pham Van L",
        author_ids: [12],
        category: "SCIENCE",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "892",
        quantity: 75
    },
    {
        id: 12,
        book_name: "Sapiens",
        price: 250,
        age_limit: 18,
        discount: 12,
        introduction: "A brief history of humankind.",
        publish_date: "2023-09-25",
        translator: "Nguyen Thi M",
        author_ids: [13],
        category: "SCIENCE",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "337",
        quantity: 90
    },
    // === FICTION ===
    {
        id: 13,
        book_name: "1984",
        price: 190,
        age_limit: 14,
        discount: 0,
        introduction: "A dystopian novel on totalitarianism.",
        publish_date: "2022-12-12",
        translator: "Tran Van N",
        author_ids: [14],
        category: "FICTION",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: null,
        code: "653",
        quantity: 88
    },
    {
        id: 14,
        book_name: "Brave New World",
        price: 185,
        age_limit: 15,
        discount: 6,
        introduction: "A futuristic society gone wrong.",
        publish_date: "2023-04-04",
        translator: "Le Thi O",
        author_ids: [15],
        category: "FICTION",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "277",
        quantity: 60
    },
    {
        id: 15,
        book_name: "The Great Gatsby",
        price: 160,
        age_limit: 12,
        discount: 4,
        introduction: "A tale of wealth and dreams.",
        publish_date: "2023-03-19",
        translator: "Nguyen Van P",
        author_ids: [16],
        category: "FICTION",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "726",
        quantity: 75
    },
    {
        id: 16,
        book_name: "To Kill a Mockingbird",
        price: 175,
        age_limit: 13,
        discount: 5,
        introduction: "Racial injustice in the American South.",
        publish_date: "2023-05-08",
        translator: "Tran Thi Q",
        author_ids: [17],
        category: "FICTION",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: null,
        code: "984",
        quantity: 82
    },
    {
        id: 17,
        book_name: "The Catcher in the Rye",
        price: 165,
        age_limit: 15,
        discount: 3,
        introduction: "A teen's perspective on society.",
        publish_date: "2023-07-07",
        translator: "Hoang Van R",
        author_ids: [18],
        category: "FICTION",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "131",
        quantity: 65
    },
    {
        id: 18,
        book_name: "Lord of the Flies",
        price: 170,
        age_limit: 14,
        discount: 2,
        introduction: "Survival and savagery of children.",
        publish_date: "2023-06-01",
        translator: "Pham Thi S",
        author_ids: [19],
        category: "FICTION",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "565",
        quantity: 72
    },
    // === HISTORY ===
    {
        id: 19,
        book_name: "Guns, Germs, and Steel",
        price: 210,
        age_limit: 16,
        discount: 10,
        introduction: "Why civilizations developed differently.",
        publish_date: "2023-10-10",
        translator: "Nguyen Van T",
        author_ids: [20],
        category: "HISTORY",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: null,
        code: "978",
        quantity: 68
    },
    {
        id: 20,
        book_name: "The Silk Roads",
        price: 230,
        age_limit: 17,
        discount: 8,
        introduction: "A new history of the world.",
        publish_date: "2023-09-01",
        translator: "Tran Thi U",
        author_ids: [21],
        category: "HISTORY",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "840",
        quantity: 77
    },
    {
        id: 21,
        book_name: "A People's History of the United States",
        price: 250,
        age_limit: 18,
        discount: 15,
        introduction: "History from the common people's view.",
        publish_date: "2023-08-18",
        translator: "Le Van V",
        author_ids: [22],
        category: "HISTORY",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "601",
        quantity: 55
    },
    {
        id: 22,
        book_name: "Postwar: Europe Since 1945",
        price: 270,
        age_limit: 18,
        discount: 10,
        introduction: "Comprehensive history of postwar Europe.",
        publish_date: "2023-02-02",
        translator: "Nguyen Thi W",
        author_ids: [23],
        category: "HISTORY",
        language: "VIETNAMESE",
        publisher_id: 1,
        coverImage: null,
        code: "459",
        quantity: 66
    },
    {
        id: 23,
        book_name: "The History of the Ancient World",
        price: 240,
        age_limit: 17,
        discount: 6,
        introduction: "History from the earliest accounts.",
        publish_date: "2023-01-10",
        translator: "Pham Van X",
        author_ids: [24],
        category: "HISTORY",
        language: "VIETNAMESE",
        publisher_id: 2,
        coverImage: null,
        code: "328",
        quantity: 70
    },
    {
        id: 24,
        book_name: "SPQR: A History of Ancient Rome",
        price: 260,
        age_limit: 17,
        discount: 7,
        introduction: "The rise and fall of Roman Empire.",
        publish_date: "2023-03-03",
        translator: "Hoang Thi Y",
        author_ids: [25],
        category: "HISTORY",
        language: "VIETNAMESE",
        publisher_id: 3,
        coverImage: null,
        code: "741",
        quantity: 64
    }
];


export function Home() {
    const navigate = useNavigate();
    const [booksx, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:8080/admin/resource/book/all');
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