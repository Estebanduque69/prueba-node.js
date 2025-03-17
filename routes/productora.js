const { Router } = require('express');
const Productora = require('../models/Productora');
const { check, validationResult } = require('express-validator');

const router = Router();

// Crear una productora
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, slogan, descripcion } = req.body;
        const productora = new Productora({ name, slogan, descripcion });
        await productora.save();

        res.status(201).json(productora);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Obtener todas las productoras (GET)
router.get('/', async function (req, res) {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Editar una productora
router.put('/:id', async (req, res) => {
    try {
        const productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).json({ message: 'Productora no encontrada' });
        }

        Object.assign(productora, req.body, { fechaActualizacion: new Date() });
        await productora.save();

        res.json(productora);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Eliminar una productora por ID (DELETE)
router.delete('/:id', async function (req, res) {
    try {
        let productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).send('Productora not found');
        }

        await Productora.findByIdAndDelete(req.params.id);
        res.send({ message: 'Productora deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;

