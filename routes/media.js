const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear una nueva media (POST)
router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('imagen', 'invalid.imagen').not().isEmpty(),
    check('anioEstreno', 'invalid.anioEstreno').isNumeric(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let media = new Media(req.body);
        media.createdAt = new Date();
        media.updatedAt = new Date();

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.error('Error al crear media:', error); // Log detallado
        res.status(500).send({ message: 'Error al crear media', error: error.message });
    }
});

// Obtener todas las medias (GET)
router.get('/', async function (req, res) {
    try {
        const medias = await Media.find()
            .populate('genero', 'name')
            .populate('director', 'nombres')
            .populate('productora', 'name')
            .populate('tipo', 'name');

        res.send(medias);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Actualizar una media por ID (PUT)
router.put('/:id', async function (req, res) {
    try {
        let media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).send('Media not found');
        }

        Object.assign(media, req.body, { updatedAt: new Date() });
        media = await media.save();

        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Eliminar una media por ID (DELETE)
router.delete('/:id', async function (req, res) {
    try {
        let media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).send('Media not found');
        }

        await Media.findByIdAndDelete(req.params.id);
        res.send({ message: 'Media deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
