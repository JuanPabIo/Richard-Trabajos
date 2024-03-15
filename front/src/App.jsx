import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import axios from 'axios';
import './App.css'
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  axios.defaults.baseURL = 'http://localhost:3000/api';
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/:id/edit' element={<ProductForm />} />
            <Route path='/products/new' element={<ProductForm />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
