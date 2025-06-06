import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./client.css"
import axios from "axios";


const DetailsBook = () => {
    const location = useLocation();
    const { book, eBooks } = location.state;
    const [authorList, setAuthorList] = useState([]);

    useEffect(() => {
        book?.author_ids.forEach((authorId) => {
            //use axios to get each author
            axios.get(`http://localhost:8080/admin/resource/author/${authorId}`)
                .then((res) => {setAuthorList(prev => [...prev, res.data]);})
                .catch((err) => console.error("Error fetching author:", err));
        })
    }, []);

    if (!book) return <div>Đang tải...</div>;

    return (
        <div className="container">
            <div className="imageWrapper">
                <img src={`data:${book.coverImage.imageType};base64,${book.coverImage.data}`|| "https://bizweb.dktcdn.net/100/363/455/products/con-duong-tinh-thuc-01.jpg?v=1744625216473"} alt={book.book_name} className="bookImage" />
            </div>
            <div className="info">
                <h1 className="title">{book.book_name}</h1>
                <div className="author">Tác giả: <b>
                    {authorList.length
                        ? authorList.map(a => a.name).join(", ")
                        : "Không có tác giả"}
                </b>
                </div>
                <div className="price">
                    <span className="salePrice">{book.price}.000đ</span>
                    <span className="discount">- {book.discount}%</span>
                </div>
                {/*<div className="quantity">*/}
                {/*  /!*<button>-</button>*!/*/}
                {/*  /!*<span>1</span>*!/*/}
                {/*  /!*<button>+</button>*!/*/}
                {/*  /!*<span className="stock">Còn lại {book.quantity} trong kho</span>*!/*/}
                {/*</div>*/}
                {/*{eBooks ? (*/}
                {/*  <div className="actions">*/}
                {/*    <button className="addToCart">Đặt ngay eBooks</button>*/}
                {/*  </div>*/}
                {/*) : (*/}
                {/*  <div className="actions">*/}
                {/*    <button className="addToCart">Thêm vào giỏ hàng</button>*/}
                {/*    <button className="buyNow">Mua ngay</button>*/}
                {/*  </div>*/}
                {/*)}*/}
                {/*<div className="ecom">*/}
                {/*  <span>Mua sách trên sàn TMĐT</span>*/}
                {/*  <img src="https://www.citypng.com/public/uploads/preview/round-tiktok-icon-logo-transparent-background-701751695033010oraha4pc0r.png" alt="Tiki" />*/}
                {/*  <img src="https://classic.vn/wp-content/uploads/2022/04/logo-shopee.png" alt="Shopee" />*/}
                {/*</div>*/}
                <div className="description">
                    <h2>Mô tả sách</h2>
                    <p> Thông tin sách: {book.introduction}</p>
                    <p> Ngôn ngữ: {book.language}</p>
                    <p> Thể loại: {book.category}</p>
                    <p> Ngày xuất bản: {book.publish_date}</p>
                    <p> Dịch giả: {book.translator}</p>
                    <p> Nhà xuất bản: {book.publisher || "Nhà xuất bản Hà Nội"}</p>
                    <p> Số lượng: {book.quantity} quyển</p>
                </div>
            </div>
        </div>
    );
};

export default DetailsBook;