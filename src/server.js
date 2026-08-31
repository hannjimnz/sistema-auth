const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente'
    });
});

app.get('/api/hola', (req, res) => {
    res.json({
        mensaje: 'Hola desde la API'
    });
});

const PORT = 3000;
const iniciarServidor = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`servidor ejecutandose en http://localhost:${PORT}`);
    });
};
iniciarServidor();
