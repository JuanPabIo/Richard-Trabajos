//models/authModel.js

import { dbConfig } from '../config/db.config.js';
import mysql from 'mysql2/promise.js';
import bcrypt from 'bcrypt';

const pool = mysql.createPool(dbConfig);

//Función para registrar el usuario
export const registerUser = async(userData) => {
    const { username, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, email, password) values (?,?,?)',
    [username, email, hashedPassword]);
};

//Esta función es para validar usuarios existentes por el usuario

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
}

//Función para inicio de sesión
export const loginUser = async(email, password) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!rows.length) {
        throw new Error('Usuario no existe');
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }
    return user;
};