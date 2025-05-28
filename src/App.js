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
import {Login} from "./components/admin/Login";
import {PrivateRoute} from "./components/admin/PrivateRoute";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

function App() {
    return (
       // <AuthProvider>
       //  <PrimeReactProvider>
            <Routes>
                <Route path="/" element={<UserLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>
                <Route path="/admin/login" element={<Login/>} />
                <Route path="/admin/" element={
                    <PrivateRoute>
                        <AdminLayout/>
                    </PrivateRoute>
                }>
                    <Route index element={<Homepage/>} />
                    <Route path="/admin/user/view" element={<User/>} />
                    <Route path='/admin/user/detail/:userId' element={<UserDetail/>} />
                    <Route path='/admin/user/create' element ={< CreateUser/>} />
                    <Route path='/admin/Staff/view' element ={< Staff/>} />
                    <Route path='/admin/Staff/create' element ={< CreateStaff/>} />
                    <Route path='/admin/Staff/detail/:id' element={< StaffDetail/>} />


                    <Route path='/admin/resource/' element={< ResourceManage/>}>
                        <Route index element={<Book/>}/>
                    </Route>
                </Route>
            </Routes>
        // </PrimeReactProvider>
       // </AuthProvider>
    );
}

export default App;