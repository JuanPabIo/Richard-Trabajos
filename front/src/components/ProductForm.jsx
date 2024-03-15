import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {

  const { id } = useParams();
  const [ formData, setFormData ] = useState({
    name: '',
    price: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      //edit product
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/products/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.log('Server Error ', error)
        }
      }
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description ) {
      alert('Please fill out all fields');
      return;
    }
    try {
      if (id) {
        //Update product
        await axios.put(`/products/${id}`, formData);
      } else {
        //Create product
        await axios.post("/products", formData);
      }
      alert('Product has ben saved ');
      navigate('/products');
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <div> 
      <h2>{ id ? 'Editar producto' : 'New Product' }</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Product Name' value={formData.name} onChange={handleChange} /> <br/>
        <input type='text' name='price' placeholder='Product Price' value={formData.price} onChange={handleChange} /> <br/>
        <input type='text' name='description' placeholder='Product Description' value={formData.description} onChange={handleChange} /> <br/>
        <button type='submit'>{ id ? 'Edit' : 'Save' }</button>
    </form>
    </div>
  )
}

export default ProductForm
