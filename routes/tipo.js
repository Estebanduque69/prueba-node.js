const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear un nuevo tipo (POST)
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').optional().not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = new Tipo();
        tipo.name = req.body.name;
        tipo.descripcion = req.body.descripcion;
        tipo.createdAt = new Date();
        tipo.updatedAt = new Date();

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Obtener todos los tipos (GET)
router.get('/', async function (req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Actualizar un tipo por ID (PUT)
router.put('/:id', [
    check('name', 'invalid.name').optional().not().isEmpty(),
    check('descripcion', 'invalid.descripcion').optional().not().isEmpty()
], async function (req, res) {
    try {
        let tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).send('Tipo not found');
        }

        tipo.name = req.body.name || tipo.name;
        tipo.descripcion = req.body.descripcion || tipo.descripcion;
        tipo.updatedAt = new Date();

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Eliminar un tipo por ID (DELETE)
router.delete('/:id', async function (req, res) {
    try {
        let tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).send('Tipo not found');
        }

        await Tipo.findByIdAndDelete(req.params.id);
        res.send({ message: 'Tipo deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;

