import React from 'react';
import {AdminLayout} from "./components/admin/AdminLayout";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./components/admin/Homepage";
import {User} from "./components/admin/User";
import {UserDetail} from "./components/admin/UserDetail";
import CreateUser from "./components/admin/CreateUser";
import CreateStaff from "./components/admin/CreateStaff";


function App() {
    return (
        <Routes>
            <Route path="/admin/" element={<AdminLayout/>}>
                <Route index element={<Homepage/>} />
                <Route path="/admin/user/view" element={<User/>} />
                <Route path='/admin/user/detail/:userId' element={<UserDetail/>} />
                <Route path='/admin/user/create' element ={< CreateUser/>} />
            </Route>
        </Routes>
    );
}

export default App;