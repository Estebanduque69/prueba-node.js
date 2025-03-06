const { Router } = require('express');
const Media = require('../models/Meedia');
const { validationResult, check } = require('express-validator');

const router = Router();

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
    check('tipo', 'invalid.tipo').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const mediaExist = await Media.findOne({ serial: req.body.serial });
        if (mediaExist) {
            return res.status(400).send('Media already exists');
        }

        let media = new Media({
            serial: req.body.serial,
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            url: req.body.url,
            imagen: req.body.imagen,
            anioEstreno: req.body.anioEstreno,
            genero: req.body.genero,
            director: req.body.director,
            productora: req.body.productora,
            tipo: req.body.tipo,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

// Obtener todas las medias (GET)
router.get('/', async function (req, res) {
    try {
        const medias = await Media.find()
            .populate('genero', 'name')
            .populate('director', 'name')
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

        media.serial = req.body.serial || media.serial;
        media.titulo = req.body.titulo || media.titulo;
        media.sinopsis = req.body.sinopsis || media.sinopsis;
        media.url = req.body.url || media.url;
        media.imagen = req.body.imagen || media.imagen;
        media.anioEstreno = req.body.anioEstreno || media.anioEstreno;
        media.genero = req.body.genero || media.genero;
        media.director = req.body.director || media.director;
        media.productora = req.body.productora || media.productora;
        media.tipo = req.body.tipo || media.tipo;
        media.fechaActualizacion = new Date();

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
