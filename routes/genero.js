const { Router } = require('express');
const Genero = require('../models/Genero');
const { check, validationResult } = require('express-validator');

const router = Router();

// Crear un género
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, descripcion } = req.body;
        const genero = new Genero({ name, descripcion });
        await genero.save();

        res.status(201).json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Obtener todos los géneros (GET)
router.get('/', async function(req, res) {
    try {
        const generos = await Genero.find(); // select * from generos;
        res.send(generos);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Editar un género
router.put('/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        Object.assign(genero, req.body, { fechaActualizacion: new Date() });
        await genero.save();

        res.json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Eliminar un género por ID (DELETE)
router.delete('/:id', async function(req, res) {
    try {
        let genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).send('Genero not found');
        }

        await Genero.findByIdAndDelete(req.params.id);
        res.send({ message: 'Genero deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
