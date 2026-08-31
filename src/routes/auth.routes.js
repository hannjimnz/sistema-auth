const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validar que todos los campos existan
        if (!name || !email || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        // Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoUsuario = new User({
            name,
            email,
            password: passwordHash
        });

        // Guardar en MongoDB
        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: nuevoUsuario._id,
                name: nuevoUsuario.name,
                email: nuevoUsuario.email
            }
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
});

module.exports = router;