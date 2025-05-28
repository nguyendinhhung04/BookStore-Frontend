import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Book } from "./Book"
import {Category} from "./Category";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function ResourceManage() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const menuItems = ["Book", "Category", "Author", "Publisher"];
    const role = useSelector((state) => state.auth.role);

    const menuURL = [
        "/admin/resource/",
        "/admin/resource/category/",
        "/admin/resource/author/",
        "/admin/resource/publisher/"
    ];
    const handleClick = (slot) => {
        console.log(slot);
        setState(slot);
        navigate(menuURL[slot])
    };

    if( role !== "ROLE_STORE_MANAGER") {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">You do not have permission to access this page.</h3>
            </div>
        );
    }

    return (
        <Container fluid>
            <Row
                className="flex-row"
                style={{
                    backgroundColor: "lightblue",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                {menuItems.map((item, index) => (
                    <Col xs={2} key={index}>
                        <button
                            onClick={() => handleClick(index)}
                            style={{
                                background: state === index ? "#9ac6cd" : "transparent",
                                border: "none",
                                color: "#000",
                                width: "100%",
                                padding: "10px",
                                cursor: "pointer",
                                fontSize: "inherit",
                            }}
                        >
                            {item}
                        </button>
                    </Col>
                ))}
            </Row>
            <Row>
                <Outlet/>
            </Row>
        </Container>

    );
}
