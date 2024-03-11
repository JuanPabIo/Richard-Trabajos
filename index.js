// index.js

import express from 'express';
import productRoutes from './src/routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json);

//Invocamos las rutas del proyecto
app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});