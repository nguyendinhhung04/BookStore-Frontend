import {Col, Container} from "react-bootstrap";
import {Sidebar} from "./Sidebar";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./Homepage";
import {User} from "./User";
import React from "react";

export function Layout() {
    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex">
                {/* Sidebar */}
                <Col xs={2} className="bg-gradient p-0"
                     style={{
                         background: 'linear-gradient(to bottom, #4CAF50, #45a049)',
                         minHeight: '100vh'
                     }}
                >
                    <Sidebar/>
                </Col>


                {/* Main Content */}
                <Col xs={10} className="bg-light p-4">
                    <Routes>
                        <Route path="/" element={<Homepage/>} />
                        <Route path="/admin/user/view" element={<User/>} />
                    </Routes>
                </Col>
            </Container>
        </>
    )
}