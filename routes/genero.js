const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear un nuevo género (POST)
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Active', 'Inactive']),
    check('descripcion', 'invalid.descripcion').optional().isString()
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genero = new Genero();
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.descripcion = req.body.descripcion || "";
        genero.createdAt = new Date();
        genero.updatedAt = new Date();

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
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

// Actualizar un género por ID (PUT)
router.put('/:id', [
    check('name', 'invalid.name').optional().not().isEmpty(),
    check('state', 'invalid.state').optional().isIn(['Active', 'Inactive']),
    check('descripcion', 'invalid.descripcion').optional().isString()
], async function(req, res) {
    try {
        let genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).send('Genero not found');
        }

        genero.name = req.body.name || genero.name;
        genero.state = req.body.state || genero.state;
        genero.descripcion = req.body.descripcion || genero.descripcion;
        genero.updatedAt = new Date();

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
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
