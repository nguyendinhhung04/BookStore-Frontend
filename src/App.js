import React from 'react';
import {AdminLayout} from "./components/admin/AdminLayout";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./components/admin/Homepage";
import {User} from "./components/admin/User";
import {UserDetail} from "./components/admin/UserDetail";
import CreateUser from "./components/admin/CreateUser";
import CreateStaff from "./components/admin/CreateStaff";
import StaffDetail from './components/admin/StaffDetail';
import Staff from './components/admin/Staff';
import {UserLayout} from "./components/client/UserLayout";
import {Home} from "./components/client/Home";
import {Book} from "./components/admin/Book";
import {ResourceManage} from "./components/admin/ResourceManage";
import {Category} from "./components/admin/Category";

function App() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path="/admin/" element={<AdminLayout/>}>
                <Route index element={<Homepage/>} />
                <Route path="/admin/user/view" element={<User/>} />
                <Route path='/admin/user/detail/:userId' element={<UserDetail/>} />
                <Route path='/admin/user/create' element ={< CreateUser/>} />
                <Route path='/admin/Staff/view' element ={< Staff/>} />
                <Route path='/admin/Staff/create' element ={< CreateStaff/>} />
                <Route path='/admin/Staff/detail/:id' element={< StaffDetail/>} />

                <Route path='/admin/resource/' element={< ResourceManage/>}>

                </Route>
            </Route>
        </Routes>
    );
}

export default App;