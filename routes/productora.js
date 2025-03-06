const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear una nueva productora (POST)
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Active', 'Inactive']),
    check('slogan', 'invalid.slogan').optional().not().isEmpty(),
    check('descripcion', 'invalid.descripcion').optional().not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let productora = new Productora();
        productora.name = req.body.name;
        productora.state = req.body.state;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.createdAt = new Date();
        productora.updatedAt = new Date();

        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
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

// Actualizar una productora por ID (PUT)
router.put('/:id', [
    check('name', 'invalid.name').optional().not().isEmpty(),
    check('state', 'invalid.state').optional().isIn(['Active', 'Inactive']),
    check('slogan', 'invalid.slogan').optional().not().isEmpty(),
    check('descripcion', 'invalid.descripcion').optional().not().isEmpty()
], async function (req, res) {
    try {
        let productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(404).send('Productora not found');
        }

        productora.name = req.body.name || productora.name;
        productora.state = req.body.state || productora.state;
        productora.slogan = req.body.slogan || productora.slogan;
        productora.descripcion = req.body.descripcion || productora.descripcion;
        productora.updatedAt = new Date();

        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
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

