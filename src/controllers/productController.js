// controllers/productController.js

import * as productModel from '../models/productModel.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts() 
        console.log(products);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Obtener un producto por id
export const getProductById= async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);

        if(product) {
            res.status(201).json(products);
        } else {
            res.status(404).json({ message: 'Producto no existe' })
        }
    } catch (error) { 
        res.status(500).json({ message: error.message })
    }
};

// Crear nuevo producto
export const createNewProduct = async(req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Faltan datos' })
        }

        const productId = await productModel.createProduct({ name, price, description });
        res.status(201).json({ id: productId, name, price, description });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Actualizar un producto
export const updateProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        await productModel.updateProduct(productId, {name, price, description});
        res.status(200).json({ message: 'Producto actualizado con éxito' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Eliminar un producto
export const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        await productModel.deleteProduct(productId);
        res.status(200).json({ message: 'Producto eliminado con éxito' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};