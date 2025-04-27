import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Book } from "./Book"
import {Category} from "./Category";

export function ResourceManage() {
    const [state, setState] = useState(0);

    const handleClick = (slot) => {
        console.log(slot);
        setState(slot);
    };

    const menuItems = ["Book", "Category", "Author", "Publisher"];

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
                {state === 0 ? (<Book/>) : <Category/>}
            </Row>
        </Container>

    );
}
