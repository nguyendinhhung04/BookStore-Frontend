import {Col, Container} from "react-bootstrap";
import {Sidebar} from "./Sidebar";
import {Outlet, Route, Routes, useParams} from "react-router-dom";
import {Homepage} from "./Homepage";
import {User} from "./User";
import React from "react";
import {UserDetail} from "./UserDetail";
import CreateUser from "./CreateUser";

export function AdminLayout() {
    const {userId} = Number(useParams());
    console.log("User ID:", userId);

    return (
        <>
            <Container fluid className="p-0 vh-100 d-flex">
                {/* SideBar */}
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
                    {/*<Routes>*/}
                    {/*    <Route path="/admin" element={<Homepage/>} />*/}
                    {/*    <Route path="/admin/user/view" element={<User/>} />*/}
                    {/*    <Route path='/admin/user/detail/:userId' element={<UserDetail/>} />*/}
                    {/*    <Route path='/admin/user/create' element ={< CreateUser/>} />*/}
                    {/*</Routes>*/}
                    <Outlet/>
                </Col>
            </Container>
        </>
    )
}