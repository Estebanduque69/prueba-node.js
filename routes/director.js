const { Router } = require('express');
const Director = require('../models/Director');
const { check, validationResult } = require('express-validator');

const router = Router();

// Crear un director
router.post('/', [
    check('nombres', 'El nombre es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombres } = req.body;
        const director = new Director({ nombres });
        await director.save();

        res.status(201).json(director);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Editar un director
router.put('/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }

        Object.assign(director, req.body, { fechaActualizacion: new Date() });
        await director.save();

        res.json(director);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Obtener todos los directores
router.get('/', async function (req, res) {
    try {
        const directors = await Director.find(); // Select * from Directors
        res.send(directors);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
