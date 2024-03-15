import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error, 'Error in server');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>LIST PRODUCTS</h1>
      <Link to='/products/new'>CREATE A NEW PRODUCT</Link>
      <ul>
        { products.map(product => (
          <li key={ product.Id }>
            <strong>{ product.name } - { product.price } - { product.description } </strong>
            <Link to={`/products/${product.Id}/edit`}>EDIT</Link>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default ProductList
