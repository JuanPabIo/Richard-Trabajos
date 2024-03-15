//controllers/authController.js

import * as authModel from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

//Controlador para registrar un usuario
export const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        //Validación del formato correo electrónico
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message : 'Formato de correo no válido' })
        }

        //Validación formato y exigencias de contraseña
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
            return res.status(400).json({ message : 'La contraseña debe tener al menos una minúscula, una mayúscula, mínimo 8 caracteres y un número' })
        }

        //Verificar si el email ya está registrado
        const existingUser = await authModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message : 'El correo electrónico ya está en uso' });
        }

        await authModel.registerUser({ username, email, password });
        res.status(201).json({ message : 'Usuario registrado con éxito' })
        
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
};

//Función para iniciar sesión

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        //Validación del formato correo electrónico
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message : 'Formato de correo no válido' })
        }
        
        const user = await authModel.loginUser(email, password);

        //Generar token de autorización
        const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key');
        //Asignar el token a una cookie
        res.cookie(`token`, token, {httpOnly: true });

        res.status(201).json({ message : 'Inicio de sesión exitoso', email, token })

    } catch (error) {
        return res.status(401).json({ message : error.message })
    }
}