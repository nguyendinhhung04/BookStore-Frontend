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
import {Author as AdminAuthor} from "./components/admin/Author";
import {Publisher} from "./components/admin/Publisher";
import {CashierHome} from "./components/admin/Cashier/CashierHome";
import {CreatePayment} from "./components/admin/Cashier/CreatePayment";
import {SearchBill} from "./components/admin/Cashier/SearchBill";
import {DetailBill} from "./components/admin/Cashier/DetailBill";
import {BookDetail} from "./components/admin/Book/BookDetail";
import {CreateBook} from "./components/admin/Book/CreateBook";
import DetailsBook from "./components/client/DetailsBook";
import DetailsAuthor from "./components/client/DetailsAuthor";
import Author from "./components/client/Author";
import {Category} from "./components/client/Category";
import {CreateAuthor} from "./components/admin/Author/CreateAuthor";
import {AuthorDetail} from "./components/admin/Author/AuthorDetail";

function App() {
    return (
       // <AuthProvider>
       //  <PrimeReactProvider>
            <Routes>
                <Route path="/" element={<UserLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="book/:id" element={<DetailsBook />} />
                    <Route path="author" element={<Author />} />
                    <Route path="author/:id" element={<DetailsAuthor />} />
                    <Route path="category" element={<Category/>}/>
                    {/*<Route path="ebooks" element={<EBooks/>}/>*/}
                </Route>
                <Route path="/admin/login" element={<Login/>} />
                <Route path="/admin/" element={
                    <PrivateRoute>
                        <AdminLayout/>
                    </PrivateRoute>
                }>
                    <Route index element={<Homepage/>} />
                    <Route path="/admin/customer/view" element={<User/>} />
                    <Route path='/admin/customer/detail/:userId' element={<UserDetail/>} />
                    <Route path='/admin/customer/create' element ={< CreateUser/>} />
                    <Route path='/admin/staff/view' element ={< Staff/>} />
                    <Route path='/admin/staff/create' element ={< CreateStaff/>} />
                    <Route path='/admin/staff/detail/:id' element={< StaffDetail/>} />


                    <Route path='/admin/resource/' element={< ResourceManage/>}>
                        <Route index element={<Book/>}/>
                        <Route path = '/admin/resource/book/:id' element={<BookDetail/>}/>
                        <Route path = '/admin/resource/book/create' element={<CreateBook/>}/>
                        <Route path="/admin/resource/author" element={<AdminAuthor/>}/>
                        <Route path="/admin/resource/publisher" element={<Publisher/>}/>
                        <Route path="/admin/resource/author/create" element={<CreateAuthor/>}/>
                    </Route>
                    <Route path = "/admin/cashier" element={<CashierHome/>} />
                    <Route path = "/admin/cashier/create/:id" element={<CreatePayment/>} />
                    <Route path = "/admin/cashier/searchBill" element={<SearchBill/>} />
                    <Route path="/admin/resource/bill/:billId" element={<DetailBill/>}/>
                </Route>
            </Routes>
        // </PrimeReactProvider>
       // </AuthProvider>
    );
}

export default App;