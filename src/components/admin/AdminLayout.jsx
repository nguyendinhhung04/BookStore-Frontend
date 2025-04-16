import { Col, Container } from "react-bootstrap";
import { Sidebar } from "./Sidebar";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { Homepage } from "./Homepage";
import { User } from "./User";
import React from "react";
import { UserDetail } from "./UserDetail";
import CreateUser from "./CreateUser";
import { Staff } from "./Staff";
import { CreateStaff } from "./CreateStaff";
import { StaffDetail } from "./StaffDetail";

export function AdminLayout() {
    const { userId } = useParams(); // Không cần Number() ở đây
    console.log("User ID:", userId);

    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex">
                {/* SideBar */}
                <Col
                    xs={2}
                    className="bg-gradient p-0"
                    style={{
                        background: 'linear-gradient(to bottom, #4CAF50, #45a049)',
                        minHeight: '100vh'
                    }}
                >
                    <Sidebar />
                </Col>

                {/* Main Content */}
                <Col xs={10} className="bg-light p-4">

                    {/* Nếu muốn render route con thì dùng Outlet */}
                    {<Outlet /> 
                </Col>
            </Container>
        </>
    );
}
