const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
    name: { type: String, required: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    slogan: { type: String },
    descripcion: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Productora', productoraSchema);

