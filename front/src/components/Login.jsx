import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      const token = response.data.token;
      const email = response.data.email;

      Cookies.set('token', token);

      alert('Inicio de sesión exitoso');
      navigate('/products');

    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
        </div>
        <button type='Submit'>LOGIN</button>
      </form>
    </>
  )
}

export default Login