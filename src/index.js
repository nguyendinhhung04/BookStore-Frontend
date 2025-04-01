import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CreateUser from './components/admin/CreateUser';
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App";
import {BrowserRouter} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
);

