const express = require('express');
const app = express();

app.use(express.json());
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

app.listen(PORT, () => {
    console.log(`servidor ejecutandose en http://localhost:${PORT}`);
});
