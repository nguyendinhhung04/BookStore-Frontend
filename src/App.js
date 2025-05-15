import React from 'react';
import { Routes, Route } from "react-router-dom";

// Admin Layout & Pages
import { AdminLayout } from "./components/admin/AdminLayout";
import { Homepage } from "./components/admin/Homepage";
import { User } from "./components/admin/User";
import { UserDetail } from "./components/admin/UserDetail";
import CreateUser from "./components/admin/CreateUser";
import CreateStaff from "./components/admin/CreateStaff";
import StaffDetail from './components/admin/StaffDetail';
import Staff from './components/admin/Staff';

// Client Layout & Pages
import { UserLayout } from "./components/client/UserLayout";
import { Home } from "./components/client/Home";
import CategoryPage from './components/client/CategoryPage'; // Thêm nếu muốn route category

// Auth & Other Pages
import LoginPage from './components/client/LoginPage';
import RegisterPage from './components/client/RegisterPage';
import CartPage from './components/client/CartPage';

function App() {
    return (
        <Routes>
            {/* Public/User-facing Routes */}
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="category/:slug" element={<CategoryPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="cart" element={<CartPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Homepage />} />
                <Route path="user/view" element={<User />} />
                <Route path="user/detail/:userId" element={<UserDetail />} />
                <Route path="user/create" element={<CreateUser />} />
                <Route path="staff/view" element={<Staff />} />
                <Route path="staff/create" element={<CreateStaff />} />
                <Route path="staff/detail/:id" element={<StaffDetail />} />
            </Route>
        </Routes>
    );
}

export default App;
