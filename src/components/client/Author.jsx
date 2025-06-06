import React, {useState, useEffect} from "react";
import "./client.css";
import { useNavigate } from "react-router-dom";



const Author = () => {
    const navigate = useNavigate();
    const [authorsx, setAuthors] = useState([]);
    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await fetch('http://localhost:8080/admin/resource/author/all');
            const data = await response.json();
            console.log(data);
            setAuthors(data);
        };
        fetchAuthors();
    }, []);

    console.log(authorsx);

    return (
        <div className="author-list-container">
            <h1 className="author-title">Danh sách tác giả</h1>
            <div className="author-list">
                {authorsx.map((author) => (
                    <div
                        className="author-card"
                        key={author.id}
                        onClick={() => navigate(`/author/${author.id}`, { state: { author } })}
                        style={{ cursor: "pointer" }}
                    >
                        {/*<div className="author-avatar">*/}
                        {/*  <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="avatar" className="author-avatar-img" />*/}
                        {/*</div>*/}
                        <h2>{author.name}</h2>
                        <p>Tuổi: {author.age}</p>
                        <p>{author.introduction}</p>
                        {/* <div className="author-books">
              <h3>Sách đã sáng tác:</h3>
              <div className="author-books-list">
                {author.compose.map((item) => (
                  <div className="author-book-item" key={item.book.id}>
                    <img src={item.book.coverImage} alt={item.book.book_name} className="author-book-img" />
                    <span>{item.book.book_name}</span>
                  </div>
                ))}
              </div>
            </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Author;
