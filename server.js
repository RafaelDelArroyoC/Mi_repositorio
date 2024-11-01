const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el JSON en el cuerpo de la solicitud

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Cambia esto por tu usuario de MySQL
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'gestion_libros' // Asegúrate de que este nombre coincida con tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener todos los libros
app.get('/libros', (req, res) => {
    db.query('SELECT * FROM libros', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Endpoint para agregar un libro
app.post('/libros', (req, res) => {
    const { titulo, autor, anio_publicacion, genero } = req.body;
    const sql = 'INSERT INTO libros (titulo, autor, anio_publicacion, genero) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, autor, anio_publicacion, genero], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, titulo, autor, anio_publicacion, genero });
    });
});

// Endpoint para eliminar un libro
app.delete('/libros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM libros WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204); // No content
    });
});

// Endpoint para actualizar un libro
app.put('/libros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, anio_publicacion, genero } = req.body;
    const sql = 'UPDATE libros SET titulo = ?, autor = ?, anio_publicacion = ?, genero = ? WHERE id = ?';
    db.query(sql, [titulo, autor, anio_publicacion, genero, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, titulo, autor, anio_publicacion, genero });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
