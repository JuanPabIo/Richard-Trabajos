//routes/productRoutes.js

import express from "express"; 
import * as productController from '../controllers/productController.js';

const router = express.Router();

//Ruta para obtener los productos
router.get('/products', productController.getAllProducts);

//Ruta para obtener un solo producto 
router.get('/products/:id', productController.getProductById);

//Ruta para crear un producto nuevo
router.post('/newproduct', productController.createNewProduct);

//Ruta para editar un producto
router.put('/editproduct/:id', productController.updateProduct);

//Ruta para eliminar un producto existente
router.delete('/delproduct/:id', productController.deleteProduct);

export default router;