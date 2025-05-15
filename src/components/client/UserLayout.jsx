import React, { useState, useEffect } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')                   // loại bỏ dấu
    .replace(/[\u0300-\u036f]/g, '')   // loại bỏ dấu
    .replace(/\s+/g, '-')              // thay khoảng trắng bằng dấu -
    .replace(/[^\w\-]+/g, '')          // loại bỏ ký tự đặc biệt
    .replace(/\-\-+/g, '-')            // thay dấu -- thành -
    .replace(/^-+/, '')                // bỏ dấu - ở đầu
    .replace(/-+$/, '');               // bỏ dấu - ở cuối
}

function CategoryDropdown() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        setCategories({
          "Hư cấu": [
            "Văn học hiện đại",
            "Văn học kinh điển",
            "Văn học thiếu nhi",
            "Lãng mạn",
            "Kỳ ảo",
            "Trinh thám - Kinh dị",
            "Khoa học Viễn tưởng",
            "Phiêu lưu ly kỳ",
            "Tản văn",
            "Truyện tranh (graphic novel)",
            "Sách tranh (Picture book)",
            "Thơ - kịch",
            "Light novel",
            "Sách tô màu",
          ],
          "Phi hư cấu": [
            "Triết học",
            "Sử học",
            "Khoa học",
            "Kinh doanh",
            "Kinh tế chính trị",
            "Kỹ năng",
            "Nghệ thuật",
            "Nuôi dạy con",
            "Tiểu luận - phê bình",
            "Tâm lý ứng dụng",
            "Tâm lý học",
            "Hồi ký",
            "Y học - Sức khỏe",
            "Tâm linh - Tôn giáo",
          ],
          "Thiếu nhi": ["0-5 tuổi", "6-8 tuổi", "9-12 tuổi", "13-15 tuổi"],
          "Phân loại khác": [
            "Sách bán chạy",
            "Sách mới xuất bản",
            "Sách sắp xuất bản",
            "Sách được giải thưởng",
            "Sách pop-up, lift-the-flaps",
            "Nghiên cứu Việt Nam",
            "Việt Nam danh tác",
            "Tác giả Việt Nam",
            "Bản đặc biệt",
            "Phụ kiện - Quà tặng",
          ],
        });
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: 4,
        width: "700px",
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 1000,
      }}
    >
      <Row style={{ width: "100%" }}>
        {Object.entries(categories).map(([group, items]) => (
          <Col key={group} xs={12} md={3}>
            <h6 style={{ color: "green", fontWeight: "bold" }}>{group}</h6>
            <hr style={{ borderColor: "lightgray", margin: "4px 0" }} />
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {items.map((item) => (
                <li key={item} style={{ marginBottom: 8 }}>
                  <Link
                    to={`/category/${slugify(item)}`}
                    style={{ textDecoration: "none", color: "#5D4037" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export function UserLayout() {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <>
      <Container fluid className="p-0 vh-100 d-flex flex-column">
        {/* Header Bar */}
        <Row
          className="m-0 w-100 align-items-center"
          style={{
            backgroundColor: "#DDD19F",
            padding: "15px 0",
            fontFamily: "Cormorant Garamond",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Col xs={8} className="d-flex justify-content-center">
            <Nav>
              <Nav.Link
                as={Link}
                to="/books"
                className="mx-3"
                style={{
                  color: "#5D4037",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                Books
              </Nav.Link>

              <div
                onMouseEnter={() => setShowCategory(true)}
                onMouseLeave={() => setShowCategory(false)}
                style={{ position: "relative" }}
              >
                <Nav.Link
                  as={Link}
                  to="/category"
                  className="mx-3"
                  style={{
                    color: "#5D4037",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Category
                </Nav.Link>
                {showCategory && <CategoryDropdown />}
              </div>

              <Nav.Link
                as={Link}
                to="/author"
                className="mx-3"
                style={{
                  color: "#5D4037",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                Author
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/ebooks"
                className="mx-3"
                style={{
                  color: "#5D4037",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                eBooks
              </Nav.Link>
            </Nav>
          </Col>

          {/* Các nút Login, Register, Cart */}
          <Col xs={4} className="d-flex justify-content-end pe-4">
            <Nav>
              <Nav.Link
                as={Link}
                to="/cart"
                className="mx-2"
                style={{ color: "#5D4037", fontSize: "1rem", fontWeight: "500" }}
              >
                🛒 Cart
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                className="mx-2"
                style={{ color: "#5D4037", fontSize: "1rem", fontWeight: "500" }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className="mx-2"
                style={{ color: "#5D4037", fontSize: "1rem", fontWeight: "500" }}
              >
                Register
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        {/* Bottom border line */}
        <Row className="m-0 w-100">
          <Col className="p-0">
            <hr style={{ margin: 0, borderTop: "1px solid #5D4037" }} />
          </Col>
        </Row>

        {/* Main Content */}
        <Row
          className="m-0 flex-grow-1 justify-content-center"
          style={{ backgroundColor: "#F8F4E3" }}
        >
          <Col className="p-0">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
