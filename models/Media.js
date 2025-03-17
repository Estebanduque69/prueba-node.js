const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    imagen: { type: String, required: true },
    anioEstreno: { type: Number, required: true },
    genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);