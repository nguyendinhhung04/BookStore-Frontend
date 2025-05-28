import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     role: null,
//     token: null,
//     username: null,
//     isAuthenticated: false
// };
const initialState = (localStorage.getItem('auth') !== null) ? JSON.parse(localStorage.getItem('auth')) : {
    role: null,
    token: null,
    username: null,
    isAuthenticated: false
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log('Payload in setToken:', action.payload); // 👈 log để kiểm tra
            state.role  = action.payload.role;
            state.token = action.payload.token;
            state.username  = action.payload.username;
            state.isAuthenticated = true;
            localStorage.setItem('auth', JSON.stringify(state)); //save to localStorage
        },
        clearToken: (state) => {
            state.token = null;
            state.username = null;
            state.role = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth');
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;