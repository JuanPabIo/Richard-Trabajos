// Models/productModel.js
// creación modelo producto

import dbConfig from '../config/db.config.js';
import mysql from 'mysql2/promise';

const pool = mysql.createPool(dbConfig);

// Obtener los productos
// getAll

export const getProducts = async () => {
    const [rows] = await pool.query("SELECT * FROM productos");
    return rows;
};

// Obtener productos por id
// getById

export const getProductById = async (productId) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE Id=?', [productId]);
    return rows[0];
};

// Agregar producto
// create

export const createProduct = async (productData) => {
    const [ name, price, description ] = productData;
    const [ result ] = await pool.query('INSERT INTO productos (name, price, description) VALUES (?, ?, ?)', 
    [name, price, description]);
    return result.insertId;
};

// Actualizar producto
// update

export const updateProduct = async (productId, productData) => {
    const [ name, price, description ] = productData;
    await pool.query('UPDATE productos SET name = ?, price = ?, description = ? WHERE Id =?',
    [name, price, description, productId]);
};

// Eliminar producto 
// delete

export const deleteProduct = async (productId) => {
    await pool.query('DELETE FROM products WHERE Id =?', [productId]);
}