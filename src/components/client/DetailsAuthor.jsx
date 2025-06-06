import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./client.css";
import axios from "axios";

const DetailsAuthor = () => {
    const location = useLocation();
    const { author } = location.state || {};
    const [composeList, setComposeList] = useState([]);

    useEffect(() => {
        console.log(author.composes);
        author.composes.forEach((item) => {
            const composeId = typeof item === "object" ? item.id : item;
            axios.get(`http://localhost:8080/admin/resource/compose/${composeId}`)
                .then((res) => {
                    setComposeList(prev => [...(prev || []), res.data]);
                })
                .catch((err) => console.error("Error fetching book:", err));
        })
    }, [author]);

    console.log(composeList);

    if (!author) return <div>Đang tải...</div>;

    return (
        <div className="container">
            {/*<div className="imageWrapper">*/}
            {/*  <div className="author-avatar" style={{margin:0}}>*/}
            {/*    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" className="author-avatar-img" />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="info">
                <h1 className="title">{author.name}</h1>
                <div className="author">Tuổi: <b>{author.age}</b></div>
                <div className="author">{author.introduction}</div>
                <div className="author-books" style={{marginTop:24}}>
                    <h3>Sách đã sáng tác:</h3>
                    <div className="author-books-list">
                        {composeList?.map((item) => (
                            <div className="author-book-item" key={item.book?.id}>
                                <img src={`data:${item.book?.coverImage.imageType};base64,${item.book?.coverImage.data}`} alt={item.book?.book_name} className="author-book-img" />
                                <span>{item.book?.book_name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsAuthor; 