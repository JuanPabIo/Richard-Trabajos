import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
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
      await axios.post('/register', formData);
      alert('Usuario registrado con éxito');
      navigate('/login');

    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <h1>REGISTER</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
          <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
          <button type='Submit'>Register</button>
        </form>
      </div>
    </>
  )
};

export default Register
