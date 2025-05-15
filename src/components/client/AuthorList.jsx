// src/pages/AuthorList.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const defaultAvatar = "https://via.placeholder.com/150?text=No+Image";

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/authors") // thay bằng endpoint thật
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch(() =>
        setAuthors([
          // fallback mock data
          { name: "Kolya Bùi", imageUrl: null },
          { name: "Maxime Péroz", imageUrl: "https://example.com/maxime.jpg" },
          { name: "James West", imageUrl: null },
          { name: "Nick Trenton", imageUrl: "https://example.com/nick.jpg" },
          // ... thêm tùy ý
        ])
      );
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4" style={{ color: "green", fontWeight: "bold" }}>
        Tác giả
      </h2>
      <Row className="g-4">
        {authors.map((author, idx) => (
          <Col key={idx} xs={6} sm={4} md={3} lg={2} className="text-center">
            <img
              src={author.imageUrl || defaultAvatar}
              alt={author.name}
              className="rounded-circle mb-2"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <div>{author.name}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
